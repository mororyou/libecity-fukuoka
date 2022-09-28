import { addMinutes, format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ErrorTable, Spread, TimeTable } from '../../types/type'
import { supabase } from '../../utils/supabase'

// シート名
const SHEET_NAME = 'フォームの回答 1'
// 予約登録時回答内容
const ENTRY_MODE_VALUE = '新しく予約をする'

const SPREAD_TABLE = 't_spread'
const TIMETABLE_TABLE = 't_timetables'
const ERROR_TABLE = 't_errors'

const AsyncSpread = async () => {
  console.clear()
  console.log('-------------------------------------------')
  const spreadResult: any = []
  const destroyResult: any = []

  const spread = await getSpread(SHEET_NAME)
  const spreadChecked = await newRecordCheck(spread)

  if (spreadChecked?.status) {
    return
  }

  await spread.map(async (row: any, index: Number) => {
    if (index > 0) {
      const timestamp = format(new Date(row[0]), 'yyyy/MM/dd HH:mm:ss', {
        locale: ja,
      })
      if (
        timestamp > (spreadChecked?.latestDate as string) ||
        spreadChecked == null
      ) {
        if (row[4] === ENTRY_MODE_VALUE) {
          // 新規予約
          const date = strToDateCnv(row[5])
          spreadResult.push({
            email: row[1],
            name: row[3],
            url: row[2],
            date: date.date,
            month: date.month,
            from_time: row[6],
            to_time: row[7],
            mode: 'entry',
            timestamp: timestamp,
          })
        } else {
          // 予約削除
          let res: any = row[8]
          res = res.split(',')
          res.map((item: string) => {
            const date = strToDateCnv(item)
            spreadResult.push({
              name: row[3],
              url: row[2],
              date: date.date,
              month: date.month,
              mode: 'cancel',
              timestamp: timestamp,
            })

            destroyResult.push({
              name: row[3],
              url: row[2],
              date: date.date,
              month: date.month,
            })
          })
        }
      }
    }
  })

  if (spreadResult && spreadResult.length > 0) {
    // SpreadTable Store
    console.log('spreadtable Store')
    const spreadResponse = await spreadStore(spreadResult)
    console.log(spreadResponse)
    console.log('-------------------------------------------')

    // TimeTable Store
    console.log('timetable Store')
    const timetableResponse = await timeTableCnv(spreadResult)
    console.log(timetableResponse)
    console.log('-------------------------------------------')
  }

  if (destroyResult && destroyResult.length > 0) {
    console.log('timetable Destroy')
    console.log(destroyResult)
  }
  console.log('-------------------------------------------')
}

export default AsyncSpread

// Spread データ取得
const getSpread = async (sheetName: string) => {
  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREAD_ID}/values/${sheetName}?key=${process.env.NEXT_PUBLIC_SPREAD_API_KEY}`
  const res = await fetch(apiUrl)
  const spread = await res.json()

  return spread.values
}

// 新着レコードチェック
const newRecordCheck = async (spread: any) => {
  // Supabase 最新のTimeStamp取得
  const { data, error, status, count } = await supabase
    .from(SPREAD_TABLE)
    .select('timestamp')
    .order('timestamp', { ascending: false })
    .limit(1)

  if (data && data?.length > 0) {
    const timestamp = parseISO(data[0]['timestamp'])
    const supabasePublished = format(timestamp, 'yyyy/MM/dd HH:mm:ss', {
      locale: ja,
    })

    // Spread 最新データ取得
    const key = spread.length - 1
    const spreadLastPublished = format(
      new Date(spread[key][0]),
      'yyyy/MM/dd HH:mm:ss',
      {
        locale: ja,
      }
    )

    if (supabasePublished === spreadLastPublished) {
      return {
        status: true,
      }
    } else {
      return {
        status: false,
        latestDate: supabasePublished,
      }
    }
  } else {
    return null
  }
}

// 日付コンバート
const strToDateCnv = (string: string) => {
  let res: any = string.replace(/[^0-9/]/g, '')
  res = res.split('/')
  const date = format(new Date(res[0], res[1] - 1, res[2]), 'yyyy/MM/dd', {
    locale: ja,
  })
  return {
    date: date,
    month: res[1],
  }
}

/**
 * timeTableConv
 * @param obj
 */
const timeTableCnv = async (obj: any) => {
  const result: Array<{}> = []
  await obj.map((record: Spread) => {
    if (record.from_time != null && record.to_time != null) {
      let fromTime = format(
        new Date(`${record.date} ${record.from_time}`),
        'yyyy/MM/dd HH:mm:ss',
        {
          locale: ja,
        }
      )
      let toTime = format(
        new Date(`${record.date} ${record.to_time}`),
        'yyyy/MM/dd HH:mm:ss',
        {
          locale: ja,
        }
      )

      while (fromTime < toTime) {
        fromTime = format(
          addMinutes(new Date(fromTime), 30),
          'yyyy/MM/dd HH:mm:ss',
          {
            locale: ja,
          }
        )
        const time = format(new Date(fromTime), 'HH:mm', {
          locale: ja,
        })
        result.push({
          date: record.date,
          time: time,
          name: record.name,
          url: record.url,
        })
      }
    }
  })
  const response = await timeTableStore(result)
  return response
}

/**
 * spreadStore
 * supabase t_spread Insert
 * @param obj Spread
 */
const spreadStore = async (obj: Spread) => {
  const { data, error } = await supabase.from(ERROR_TABLE).insert(obj)
  if (error) {
    return error
  } else {
    return data
  }
}

/**
 * timeTableStore
 * supabase t_timetables insert
 * @param obj Spread
 */
const timeTableStore = async (obj: Array<{}>) => {
  const { data, error } = await supabase.from(TIMETABLE_TABLE).insert(obj)
  if (error) {
    return error
  } else {
    return data
  }
}

/**
 *
 *
 */

/**
 * timeTableDestroy
 */
const timeTableDestroy = async () => {}

/**
 * errorStore
 * supabase t_errors insert
 * @param obj
 */
const errorStore = async (obj: ErrorTable) => {
  const { data, error } = await supabase.from(TIMETABLE_TABLE).insert(obj)
  if (error) {
    return error
  } else {
    return data
  }
}

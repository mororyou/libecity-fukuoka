import { useEffect, useState } from "react"
import Layout from "../../components/Layout"

const Status = () => {

  const [loading, setLoading] = useState(false)
  const [sheet, setSheet] = useState('シート1')

  const [month, setMonth] = useState('')
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const f = async () => {
      setLoading(true)
      setLoading(false)
    }

    f()
  }, [month])

  return (
    <Layout>
      {loading ? (
        <>Loading</>
      ) : (
        <table className="my-12 table-fixed border-collapse border-blue-400 overflow-scroll">
          <tbody>
            {datas &&
              datas.map((rows: any, index) => {
                if (index > 1) {
                  return (
                    <tr key={index} className="border-blue-400">
                      {rows.map((row: any, idx: number) => {
                        if (idx < 15) {
                          return (
                            <td
                              key={idx}
                              className={`
                            ${idx === 0 ? 'w-auto px-2' : 'w-16'}
                            ${
                              row === '○' && idx > 0
                                ? 'text-blue-700'
                                : row === '△' && idx > 0
                                ? 'text-red-800'
                                : 'text-gray-700'
                            } border border-gray-400 border-opacity-30 py-2 text-center font-semibol`}
                            >
                              {row}
                            </td>
                          )
                        }
                      })}
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default Status
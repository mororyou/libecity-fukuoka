import { Button } from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FC, useMemo, useState } from 'react'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component'
import { items, statusItems } from '../../libs/const'
import { Event } from '../../types/type'

type Props = {
  events: Event[]
  loading: boolean
  editBtnClickHandler: any
}

const EventTable: FC<Props> = ({ events, loading, editBtnClickHandler }) => {
  const [currentRow, setCurrentRow] = useState<Event | undefined>(undefined)
  const columns = useMemo(
    () => [
      {
        id: 'date',
        name: '日時',
        width: '140px',
        cell: (row: Event) => <EventCellDataComponent event={row} />,
      },
      {
        id: 'status',
        name: '募集状況',
        width: '130px',
        cell: (row: Event) => <EventCellStatusComponent event={row} />,
      },
      {
        id: 'title',
        name: 'タイトル',
        width: 'auto',
        selector: (row: Event) => row.title,
      },
    ],
    []
  )
  const customStyles = {
    rows: {
      style: {
        minHeight: '56px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  }
  return (
    <>
      <DataTable
        columns={columns}
        data={events}
        customStyles={customStyles}
        className="my-4"
        pagination
        progressPending={loading}
        progressComponent={<CustomLoader />}
        expandableRows
        expandableRowExpanded={(row) => row === currentRow}
        onRowClicked={(row) => setCurrentRow(row)}
        onRowExpandToggled={(bool, row) => setCurrentRow(row)}
        expandableIcon={{
          collapsed: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ),
          expanded: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ),
        }}
        expandOnRowClicked={true}
        expandableRowsComponent={EventDetailComponent}
        expandableRowsComponentProps={{ onClickEvent: editBtnClickHandler }}
        highlightOnHover={true}
        striped={true}
      />
    </>
  )
}

export default EventTable

const CustomLoader = () => <div>loading...</div>

interface EventDetailProps extends ExpanderComponentProps<Event> {
  onClickEvent?: any
}

const EventDetailComponent: FC<EventDetailProps> = ({ data, onClickEvent }) => {
  return (
    <div className="relative flex flex-col items-start justify-start">
      {Object.entries(data).map(([key, value], index) => {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          const label = items[key]
          switch (key) {
            case 'event':
              return (
                <dl
                  className="flex w-full flex-row border-b border-themeTitleText border-opacity-30"
                  key={index}
                >
                  <dt className="w-28 bg-themeDetailBgColor py-[10px] px-4 text-xs font-semibold md:w-[216px] md:px-8">
                    {label}
                  </dt>
                  <dd className="py-2 pl-2 text-xs">
                    <a
                      href={value as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 bg-opacity-80 py-1 px-3 text-white hover:bg-blue-600"
                    >
                      こちらからアクセス
                    </a>
                  </dd>
                </dl>
              )
            default:
              return (
                <dl
                  className="flex w-full flex-row border-b border-themeTitleText border-opacity-30"
                  key={index}
                >
                  <dt className="w-28 bg-themeDetailBgColor py-[10px] px-4 text-xs font-semibold md:w-[216px] md:px-8">
                    {label}
                  </dt>
                  <dd className="py-2 pl-2 text-xs">{value as string}</dd>
                </dl>
              )
          }
        }
      })}
      <div className="flex w-full items-center justify-start border-b border-themeTitleText border-opacity-30 bg-white py-4 pr-[20px] md:justify-end">
        <Button
          className="h-8 w-[120px] rounded bg-themeBtnColor text-xs text-white md:h-8"
          variant="contained"
          onClick={(e) => {
            e.preventDefault()
            console.log(data)
            if (onClickEvent !== undefined) {
              onClickEvent(data)
            }
          }}
        >
          編集する
        </Button>
      </div>
    </div>
  )
}

type CellProps = {
  event: Event
  currentRow?: Event | undefined | null
}

const EventCellDataComponent: FC<CellProps> = ({ event }) => {
  const weekDay = format(new Date(event.date), 'E', {
    locale: ja,
  })
  return (
    <div className="flex flex-col gap-y-1 ">
      <p className="font-semibold">
        {format(new Date(event.date), 'yyyy/MM/dd', { locale: ja })}
        <span
          className={`${
            weekDay === '日'
              ? 'text-red-600'
              : weekDay === '土'
              ? 'text-blue-600'
              : 'text-black'
          } ml-1`}
        >
          ({weekDay})
        </span>
      </p>
      <p>{event.time}</p>
    </div>
  )
}

const EventCellStatusComponent: FC<CellProps> = ({ event }) => {
  let statusStyle = ''
  switch (event.status) {
    case 0:
      statusStyle = 'eventStatusLabelBefore'
      break
    case 1:
      statusStyle = 'eventStatusLabelProgress'
      break
    case 2:
      statusStyle = 'eventStatusLabelCancel'
      break
    case 80:
      statusStyle = 'eventStatusLabelExit'
      break
    case 99:
      statusStyle = 'eventStatusLabelMedium'
      break
  }
  return (
    <div className="flex flex-col gap-y-1">
      <div>
        <span className={statusStyle}>{statusItems[event.status]}</span>
      </div>
      <p className="text-xs">募集人数：{event.people}</p>
    </div>
  )
}

const EventCellArrowComponent: FC<CellProps> = ({ event, currentRow }) => {
  return <></>
}

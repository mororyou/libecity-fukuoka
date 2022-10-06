import { Button } from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FC, useMemo } from 'react'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component'
import { items, statusItems } from '../../libs/const'
import { Event } from '../../types/type'

type Props = {
  events: Event[]
  loading: boolean
  editBtnClickHandler: any
}

const EventTable: FC<Props> = ({ events, loading, editBtnClickHandler }) => {
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
        width: '115px',
        cell: (row: Event) => <EventCellStatusComponent event={row} />,
      },
      {
        id: 'title',
        name: 'タイトル',
        width: 'auto',
        selector: (row: Event) => row.title,
      },
      {
        id: 'edit',
        name: '',
        width: '',
        cell: (row: Event) => {
          return (
            <div className="ml-auto pr-16">
              <Button
                variant="outlined"
                className="border-themeMainColor text-sm text-themeMainColor"
                size="small"
                onClick={(e) => {
                  e.preventDefault()
                  editBtnClickHandler(row)
                }}
              >
                編集
              </Button>
            </div>
          )
        },
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
    <DataTable
      columns={columns}
      data={events}
      customStyles={customStyles}
      className="my-4"
      pagination
      progressPending={loading}
      progressComponent={<CustomLoader />}
      expandableRows
      expandOnRowClicked={true}
      expandableRowsHideExpander={true}
      expandableRowsComponent={EventDetailComponent}
      highlightOnHover={true}
      striped={true}
    />
  )
}

export default EventTable

const CustomLoader = () => <div>loading...</div>

const EventDetailComponent: FC<ExpanderComponentProps<Event>> = ({ data }) => {
  return (
    <div className="relative flex flex-col items-start justify-start">
      {Object.entries(data).map(([key, value], index) => {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          const label = items[key]
          switch (key) {
            case 'event':
              return (
                <dl
                  className="flex w-full flex-row border-b border-themeMainColor border-opacity-30"
                  key={index}
                >
                  <dt className="w-28 bg-themeMainColor bg-opacity-20 py-2 px-4 text-xs font-semibold md:w-2/12 md:px-8">
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
                  className="flex w-full flex-row border-b border-themeMainColor border-opacity-30"
                  key={index}
                >
                  <dt className="w-28 bg-themeMainColor bg-opacity-20 py-2 px-4 text-xs font-semibold md:w-2/12 md:px-8">
                    {label}
                  </dt>
                  <dd className="py-2 pl-2 text-xs">{value as string}</dd>
                </dl>
              )
          }
        }
      })}
    </div>
  )
}

type CellProps = {
  event: Event
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
  return (
    <div className="flex flex-col gap-y-1 ">
      <p className="font-semibold">{statusItems[event.status]}</p>
      <p className='text-xs'>募集人数：{event.people}</p>
    </div>
  )
}
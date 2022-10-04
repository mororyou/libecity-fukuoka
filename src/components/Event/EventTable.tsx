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
}

const EventTable: FC<Props> = ({ events, loading }) => {
  const columns = useMemo(
    () => [
      {
        id: 'date',
        name: '日付',
        width: '140px',
        sortable: true,
        sortField: 'date',
        selector: (row: Event) =>
          format(new Date(row.date), 'yyyy/MM/dd(E)', { locale: ja }),
        conditionalCellStyles: [
          {
            when: (row: Event) =>
              format(new Date(row.date), 'E', { locale: ja }) == '土',
            style: {
              color: 'blue',
            },
          },
          {
            when: (row: Event) =>
              format(new Date(row.date), 'E', { locale: ja }) == '日',
            style: {
              color: 'tomato',
            },
          },
        ],
      },
      {
        id: 'time',
        name: '開催時間',
        width: '115px',
        selector: (row: Event) => row.time,
      },
      {
        id: 'status',
        name: '募集状況',
        width: '115px',
        selector: (row: Event) => statusItems[row.status],
      },
      {
        id: 'title',
        name: 'タイトル',
        width: '400px',
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


const CustomLoader = () => (
  <div>
    loading
  </div>
)

const EventDetailComponent: FC<ExpanderComponentProps<Event>> = ({data}) => {
  return (
    <div className="relative flex flex-col items-start justify-start">
      {Object.entries(data).map(([key, value], index) => {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          return (
            <dl
              className="flex w-full flex-row border-b border-themeMainColor border-opacity-30"
              key={index}
            >
              <dt className="w-28 bg-themeMainColor bg-opacity-20 py-2 px-4 text-xs font-semibold md:w-2/12 md:px-8">
                {items[key]}
              </dt>
              <dd className="py-2 pl-2 text-xs">{value}</dd>
            </dl>
          )
        }
      })}

      <dl
        className="flex w-full flex-row border-b border-themeMainColor border-opacity-30"
      >
        <dt className="w-28 bg-themeMainColor bg-opacity-20 py-2 px-4 text-xs font-semibold md:w-2/12 md:px-8">
        </dt>
        <dd className="py-2 pl-2 text-xs">
          <Button size='small' variant="contained" className="bg-themeMainColor text-white">編集する(未実装)</Button>
        </dd>
      </dl>
    </div>
  )
}
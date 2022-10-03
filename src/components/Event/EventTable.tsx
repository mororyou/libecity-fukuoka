import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FC, useMemo } from 'react'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component'
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
        id: 'title',
        name: 'タイトル',
        width: '400px',
        selector: (row: Event) => row.title,
      },
    ],
    []
  )

  // data provides access to your row data
  const ExpandedComponent: FC<ExpanderComponentProps<Event>> = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  }

  return (
    <DataTable
      columns={columns}
      data={events}
      className="my-4"
      fixedHeader
      fixedHeaderScrollHeight="500px"
      pagination
      progressPending={loading}
      progressComponent={<CustomLoader />}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  )
}

export default EventTable


const CustomLoader = () => (
  <div>
    loading
  </div>
)
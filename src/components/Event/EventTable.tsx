import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { Event } from '../../types/type'

type Props = {
  events: Event[]
}

const EventTable: FC<Props> = ({ events }) => {
  const columns: GridColDef[] = [
    { field: 'date', headerName: '日付', width: 128 },
    { field: 'title', headerName: 'タイトル', width: 256 },
    { field: 'time', headerName: '開催時間', width: 180 },
    { field: 'location', headerName: '開催場所', width: 120 },
    { field: 'organizer', headerName: '主催者', width: 128 },
    { field: 'people', headerName: '応募人数', width: 90 },
    { field: 'status', headerName: '募集状況', width: 90 },
    { field: 'comment', headerName: 'コメント', width: 90 },
    { field: 'compflg', headerName: '終了', width: 90 },
  ]

  return (
    <DataGrid
      className="w-full bg-white"
      headerHeight={40}
      rowHeight={40}
      rows={events}
      columns={columns}
    />
  )
}

export default EventTable

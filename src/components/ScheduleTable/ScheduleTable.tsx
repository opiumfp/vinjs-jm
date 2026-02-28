import type { ScheduleTableItem } from '@/types/content';

interface Props {
  scheduleTableData: ScheduleTableItem[];
}

function ScheduleSlot({ item }: { item: ScheduleTableItem }) {
  if (item.talk?.id) {
    return (
      <>
        <div className="schedule-table_talk">
          <a href={`#${item.talk.id}`}>{item.talk.title}</a>
        </div>
        <div className="schedule-table_speaker">
          <a href={`#${item.speaker.id}`}>{item.speaker.name}</a>
        </div>
      </>
    );
  }
  return <div>TBA</div>;
}

export default function ScheduleTable({ scheduleTableData }: Props) {
  const data = scheduleTableData;

  return (
    <div className="schedule-table">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <table className="table table-bordered">
              <thead className="schedule-table_thead">
                <tr>
                  <td className="schedule-table_col-1">Start Time</td>
                  <td className="schedule-table_col-2">Track A</td>
                  <td className="schedule-table_col-3">Track B</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="schedule-table_time"><span>9:00</span></td>
                  <td colSpan={2} className="schedule-table_activity">
                    <span>Registration &amp; Breakfast</span>
                  </td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>10:20</span></td>
                  <td colSpan={2} className="schedule-table_activity"><span>Opening</span></td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>10:30</span></td>
                  <td colSpan={2}>
                    {data[0] && <ScheduleSlot item={data[0]} />}
                  </td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>11:10</span></td>
                  <td>{data[1] && <ScheduleSlot item={data[1]} />}</td>
                  <td>{data[2] && <ScheduleSlot item={data[2]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>11:50</span></td>
                  <td colSpan={2} className="schedule-table_activity">
                    <div>Coffee Break</div>
                    <div className="schedule-table_activity_panel">
                      Panel Discussion: Web performance: when and why?
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>12:20</span></td>
                  <td>{data[3] && <ScheduleSlot item={data[3]} />}</td>
                  <td>{data[4] && <ScheduleSlot item={data[4]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>13:00</span></td>
                  <td>{data[5] && <ScheduleSlot item={data[5]} />}</td>
                  <td>{data[6] && <ScheduleSlot item={data[6]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>13:40</span></td>
                  <td colSpan={2} className="schedule-table_activity"><span>Lunch</span></td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>15:00</span></td>
                  <td rowSpan={2}>{data[7] && <ScheduleSlot item={data[7]} />}</td>
                  <td>{data[8] && <ScheduleSlot item={data[8]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>15:20</span></td>
                  <td>{data[9] && <ScheduleSlot item={data[9]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>15:20</span></td>
                  <td rowSpan={2}>{data[10] && <ScheduleSlot item={data[10]} />}</td>
                  <td>{data[11] && <ScheduleSlot item={data[11]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>16:00</span></td>
                  <td>{data[12] && <ScheduleSlot item={data[12]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>16:20</span></td>
                  <td colSpan={2} className="schedule-table_activity">
                    <div>Coffee Break</div>
                    <div className="schedule-table_activity_panel">
                      Panel Discussion: Personal brand and how to be a Hero
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>16:50</span></td>
                  <td>{data[13] && <ScheduleSlot item={data[13]} />}</td>
                  <td>{data[14] && <ScheduleSlot item={data[14]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>17:30</span></td>
                  <td colSpan={2}>{data[15] && <ScheduleSlot item={data[15]} />}</td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>18:10</span></td>
                  <td colSpan={2} className="schedule-table_activity"><span>Partners Lottery</span></td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>19:00</span></td>
                  <td colSpan={2} className="schedule-table_activity"><span>Whiskey Rocking Party</span></td>
                </tr>
                <tr>
                  <td className="schedule-table_time"><span>22:00</span></td>
                  <td colSpan={2} className="schedule-table_activity"><span>Closing and Departing to Home</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

<template>
  <div class="schedule-table">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <table class="table  table-bordered ">
            <thead class="schedule-table_thead">
                <tr>
                    <td class="schedule-table_col-1">Start Time</td>
                    <td class="schedule-table_col-2">Tarck A</td>
                    <td class="schedule-table_col-3">Tarck B</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="schedule-table_time"><span>9:00</span></td>
                    <td colspan="2" class="schedule-table_activity">
                      <span>Registration & Breakfast</span>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>10:20</span></td>
                    <td colspan="2" class="schedule-table_activity"><span>Opening</span></td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>10:30</span></td>
                    <td colspan="2">
                      <template v-if="data[0].talk.id">
                          <div class="schedule-table_talk"><a :href="`#${data[0].talk.id}`">{{ data[0].talk.title }}</a></div>
                          <div class="schedule-table_speaker"><a :href="`#${data[0].speaker.id}`">{{ data[0].speaker.name }}</a></div>
                      </template>
                      <template v-else>
                          <div>TBA</div>
                      </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>11:10</span></td>
                    <td>
                        <template v-if="data[1].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[1].talk.id}`">{{ data[1].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[1].speaker.id}`">{{ data[1].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td>
                        <template v-if="data[2].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[2].talk.id}`">{{ data[2].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[2].speaker.id}`">{{ data[2].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>11:50</span></td>
                    <td colspan="2" class="schedule-table_activity">
                        <div>Coffee Break</div>
                        <div class="schedule-table_activity_panel">Panel Discussion: Web performance: when and why?</div>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>12:20</span></td>
                    <td>
                        <template v-if="data[3].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[3].talk.id}`">{{ data[3].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[3].speaker.id}`">{{ data[3].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td>
                        <template v-if="data[4].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[4].talk.id}`">{{ data[4].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[4].speaker.id}`">{{ data[4].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>13:00</span></td>
                    <td>
                        <template v-if="data[5].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[5].talk.id}`">{{ data[5].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[5].speaker.id}`">{{ data[5].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td><template v-if="data[6].talk.id">
                        <div class="schedule-table_talk"><a :href="`#${data[6].talk.id}`">{{ data[6].talk.title }}</a></div>
                        <div class="schedule-table_speaker"><a :href="`#${data[6].speaker.id}`">{{ data[6].speaker.name }}</a></div>
                    </template>
                    <template v-else>
                        <div>TBA</div>
                    </template></td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>13:40</span></td>
                    <td colspan="2" class="schedule-table_activity"><span>Lunch</span></td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>15:00</span></td>
                    <td rowspan="2">
                        <template v-if="data[7].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[7].talk.id}`">{{ data[7].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[7].speaker.id}`">{{ data[7].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td>
                        <template v-if="data[8].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[8].talk.id}`">{{ data[8].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[8].speaker.id}`">{{ data[8].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>15:20</span></td>
                    <td>
                        <template v-if="data[9].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[9].talk.id}`">{{ data[9].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[9].speaker.id}`">{{ data[9].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>15:20</span></td>
                    <td rowspan="2">
                        <template v-if="data[10].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[10].talk.id}`">{{ data[10].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[10].speaker.id}`">{{ data[10].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td>
                        <template v-if="data[11].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[11].talk.id}`">{{ data[11].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[11].speaker.id}`">{{ data[11].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>16:00</span></td>
                    <td>
                        <template v-if="data[12].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[12].talk.id}`">{{ data[12].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[12].speaker.id}`">{{ data[12].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>16:20</span></td>
                    <td colspan="2" class="schedule-table_activity">
                        <div>Coffee Break</div>
                        <div class="schedule-table_activity_panel">Panel Discussion: Personal brand and how to be a Hero</div>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>16:50</span></td>
                    <td>
                        <template v-if="data[13].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[13].talk.id}`">{{ data[13].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[13].speaker.id}`">{{ data[13].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                    <td>
                        <template v-if="data[14].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[14].talk.id}`">{{ data[14].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[14].speaker.id}`">{{ data[14].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>17:30</span></td>
                    <td colspan="2">
                        <template v-if="data[15].talk.id">
                            <div class="schedule-table_talk"><a :href="`#${data[15].talk.id}`">{{ data[15].talk.title }}</a></div>
                            <div class="schedule-table_speaker"><a :href="`#${data[15].speaker.id}`">{{ data[15].speaker.name }}</a></div>
                        </template>
                        <template v-else>
                            <div>TBA</div>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>18:10</span></td>
                    <td colspan="2" class="schedule-table_activity"><span>Partners Lottery</span></td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>19:00</span></td>
                    <td colspan="2" class="schedule-table_activity"><span>Whiskey Rocking Party</span></td>
                </tr>
                <tr>
                    <td class="schedule-table_time"><span>22:00</span></td>
                    <td colspan="2" class="schedule-table_activity"><span>Closing and Departing to Home</span></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import PageTitle from "@/components/PageTitle";
import moment from 'moment';

export default {
  props: {
    scheduleTableData: {
      type: Array,
      required: true
    }
  },
  components: {
    VueMarkdown,
  },
  mounted() {
    // debugger
  },
  computed: {
    data() {
      return this.$props.scheduleTableData;
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.schedule-table {
  overflow-x: auto;
  table {
    min-width: 500px;
  }
  td {
    vertical-align: middle;
  }
  &_thead {
    background-color: rgba($dark, 0.1)
  }
  &_thead,
  &_time {
    font-weight: bold;
  }
  &_talk {
    
  }
  &_speaker a{
    color: $dark;
  }
  &_activity{
    background-color: rgba($dark, 0.03);
    &_panel {
        color: $link-color;
    }
  }
  &_col {
    &-1 {
      width: 8em;
    }
    &-2,
    &-3 {
      width: 50%;
    }
  }
}
</style>

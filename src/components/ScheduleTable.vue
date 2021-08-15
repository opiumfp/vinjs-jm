<template>
  <div class="schedule-table">
    <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-striped table-bordered ">
            <thead class="schedule-table_thead">
                <tr>
                    <td class="schedule-table_col-1">Start Time</td>
                    <td class="schedule-table_col-2">Tarck A</td>
                    <td class="schedule-table_col-3">Tarck B</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                      <span class="schedule-table_time">9:00</span>
                    </td>
                    <td colspan="2">
                      <span>Registration & Breakfast</span>
                    </td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">10:20</span></td>
                    <td colspan="2"><span>Opening</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">10:30</span></td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">11:10</span></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">11:50</span></td>
                    <td colspan="2"><span>Coffee Break</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">12:20</span></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">13:00</span></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">13:40</span></td>
                    <td colspan="2"><span>Lunch</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">15:00</span></td>
                    <td rowspan="2"></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">15:20</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">15:20</span></td>
                    <td rowspan="2"></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">16:00</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">16:20</span></td>
                    <td colspan="2"><span>Coffee Break</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">16:50</span></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">17:30</span></td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">18:10</span></td>
                    <td colspan="2"><span>Partners Lottery</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">19:00</span></td>
                    <td colspan="2"><span>Whiskey Party and Cover Band</span></td>
                </tr>
                <tr>
                    <td><span class="schedule-table_time">22:00</span></td>
                    <td colspan="2"><span>Closing and Departing to Vinntysia</span></td>
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
  &_thead,
  &_time {
    font-weight: bold;
  }
  &_col {
    &-1 {
      width: 8em;
    }
  }
}
</style>

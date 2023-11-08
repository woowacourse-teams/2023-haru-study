export type CalendarStorage = {
  day: number;
  dayOfWeek: number;
  date: Date;
  state: 'prev' | 'next' | 'cur';
}[];

const calendar = {
  getCalendarStorage: (year: number, month: number): CalendarStorage => {
    return [
      ...calendar.getPrevMonthLastWeekDays(year, month),
      ...calendar.getCurMonthDays(year, month),
      ...calendar.getNextMonthFirstWeekDays(year, month),
    ];
  },

  getPrevMonthLastWeekDays: (year: number, month: number): CalendarStorage => {
    const prevMonthLastDateObject = new Date(year, month - 1, 0);

    const prevYear = prevMonthLastDateObject.getFullYear(); // 이전 달의 년도
    const prevMonth = prevMonthLastDateObject.getMonth(); // 이전 달
    const prevLastDayOfWeek = prevMonthLastDateObject.getDay(); // 이전 달의 마지막 요일
    const prevLastDay = prevMonthLastDateObject.getDate(); // 이전 달의 마지막 일

    if (prevLastDayOfWeek === 6) return []; // 이전 달의 마지막 요일이 토요일인 경우

    return Array.from({ length: prevLastDayOfWeek + 1 }).map((_, index) => {
      const day = prevLastDay - prevLastDayOfWeek + index;
      const dayOfWeek = index;

      return {
        day,
        dayOfWeek,
        date: new Date(prevYear, prevMonth, day),
        state: 'prev',
      };
    });
  },

  getCurMonthDays: (year: number, month: number): CalendarStorage => {
    const curMonthFirstDateObject = new Date(year, month - 1); // 이번 달의 첫 번째 날
    const curMonthLastDateObject = new Date(year, month, 0); // 이번 달의 마지막 날

    const curFirstDayOfWeek = curMonthFirstDateObject.getDay(); // 이번 달의 첫 번째 요일
    const curLastDay = curMonthLastDateObject.getDate(); // 이번 달의 마지막 일

    return Array.from({ length: curLastDay }).map((_, index) => {
      const day = index + 1; // 일은 index에 1을 더한 값
      const dayOfWeek = (curFirstDayOfWeek + index) % 7; // 첫 번째 요일과 index를 더한 값을 7로 나눈 값의 나머지

      return {
        day,
        dayOfWeek,
        date: new Date(year, month - 1, day),
        state: 'cur',
      };
    });
  },

  getNextMonthFirstWeekDays: (year: number, month: number): CalendarStorage => {
    const nextMonthFirstDateObject = new Date(year, month);

    const nextYear = nextMonthFirstDateObject.getFullYear(); // 다음 달의 년도
    const nextMonth = nextMonthFirstDateObject.getMonth(); // 다음 달
    const nextFirstDayOfWeek = nextMonthFirstDateObject.getDay(); // 다음 달의 마지막 요일
    const nextFirstDay = nextMonthFirstDateObject.getDate(); // 다음 달의 마지막 일

    if (nextFirstDayOfWeek === 0) return []; // 다음 달의 첫 번재 날이 일요일인 경우

    return Array.from({ length: 7 - nextFirstDayOfWeek }).map((_, index) => {
      const day = nextFirstDay + index;
      const dayOfWeek = nextFirstDayOfWeek + index;

      return {
        day,
        dayOfWeek,
        date: new Date(nextYear, nextMonth, day),
        state: 'next',
      };
    });
  },
};

export default calendar;

// class Calendar {
//   private year;

//   private month;

//   private navigationYear;

//   private navigationMonth;

//   constructor(year: number, month: number) {
//     this.year = year;
//     this.month = month;
//     this.navigationYear = year;
//     this.navigationMonth = month;
//   }

//   getCalendarStorage = () => {
//     return [
//       ...this.getPrevMonthLastWeekDays(this.year, this.month),
//       ...this.getCurMonthDays(this.year, this.month),
//       ...this.getNextMonthFirstWeekDays(this.year, this.month),
//     ];
//   };

//   getYear = () => this.year;

//   getMonth = () => this.month;

//   isToday = (date: Date) => {
//     const today = format.date(new Date());
//     const inputDate = format.date(date);

//     return today === inputDate;
//   };

//   shiftMonth = (type: 'next' | 'prev' | 'today') => {
//     let newYear = this.year;
//     let newMonth = this.month;

//     if (type === 'today') {
//       const today = new Date();

//       newYear = today.getFullYear();
//       newMonth = today.getMonth() + 1;
//     }

//     const changedMonth = this.month + (type === 'next' ? +1 : -1);

//     if (type !== 'today' && changedMonth === 0) {
//       newYear -= 1;
//       newMonth = 12;
//     }

//     if (type !== 'today' && changedMonth === 13) {
//       newYear += 1;
//       newMonth = 1;
//     }

//     if (type !== 'today' && changedMonth > 0 && changedMonth < 13) {
//       newMonth = changedMonth;
//     }

//     this.year = newYear;
//     this.navigationYear = newYear;
//     this.month = newMonth;
//     this.navigationMonth = newMonth;
//   };

//   navigateYear = (year: number) => (this.navigationYear = year);

//   navigateMonth = (month: number) => (this.navigationMonth = month);

//   navigate = () => {
//     this.year = this.navigationYear;
//     this.month = this.navigationMonth;
//   };

//   getNavigationYear = () => this.navigationYear;

//   getNavigationMonth = () => this.navigationMonth;

//   private getPrevMonthLastWeekDays = (year: number, month: number): CalendarStorage => {
//     const prevMonthLastDateObject = new Date(year, month - 1, 0);

//     const prevYear = prevMonthLastDateObject.getFullYear(); // 이전 달의 년도
//     const prevMonth = prevMonthLastDateObject.getMonth(); // 이전 달
//     const prevLastDayOfWeek = prevMonthLastDateObject.getDay(); // 이전 달의 마지막 요일
//     const prevLastDay = prevMonthLastDateObject.getDate(); // 이전 달의 마지막 일

//     if (prevLastDayOfWeek === 6) return []; // 이전 달의 마지막 요일이 토요일인 경우

//     return Array.from({ length: prevLastDayOfWeek + 1 }).map((_, index) => {
//       const day = prevLastDay - prevLastDayOfWeek + index;
//       const dayOfWeek = index;

//       return {
//         day,
//         dayOfWeek,
//         date: new Date(prevYear, prevMonth, day),
//         state: 'prev',
//       };
//     });
//   };

//   private getCurMonthDays = (year: number, month: number): CalendarStorage => {
//     const curMonthFirstDateObject = new Date(year, month - 1); // 이번 달의 첫 번째 날
//     const curMonthLastDateObject = new Date(year, month, 0); // 이번 달의 마지막 날

//     const curFirstDayOfWeek = curMonthFirstDateObject.getDay(); // 이번 달의 첫 번째 요일
//     const curLastDay = curMonthLastDateObject.getDate(); // 이번 달의 마지막 일

//     return Array.from({ length: curLastDay }).map((_, index) => {
//       const day = index + 1; // 일은 index에 1을 더한 값
//       const dayOfWeek = (curFirstDayOfWeek + index) % 7; // 첫 번째 요일과 index를 더한 값을 7로 나눈 값의 나머지

//       return {
//         day,
//         dayOfWeek,
//         date: new Date(year, month - 1, day),
//         state: 'cur',
//       };
//     });
//   };

//   private getNextMonthFirstWeekDays = (year: number, month: number): CalendarStorage => {
//     const nextMonthFirstDateObject = new Date(year, month);

//     const nextYear = nextMonthFirstDateObject.getFullYear(); // 다음 달의 년도
//     const nextMonth = nextMonthFirstDateObject.getMonth(); // 다음 달
//     const nextFirstDayOfWeek = nextMonthFirstDateObject.getDay(); // 다음 달의 마지막 요일
//     const nextFirstDay = nextMonthFirstDateObject.getDate(); // 다음 달의 마지막 일

//     if (nextFirstDayOfWeek === 0) return []; // 다음 달의 첫 번재 날이 일요일인 경우

//     return Array.from({ length: 7 - nextFirstDayOfWeek }).map((_, index) => {
//       const day = nextFirstDay + index;
//       const dayOfWeek = nextFirstDayOfWeek + index;

//       return {
//         day,
//         dayOfWeek,
//         date: new Date(nextYear, nextMonth, day),
//         state: 'next',
//       };
//     });
//   };
// }

// export default Calendar;

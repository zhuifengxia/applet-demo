const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      });
    },
    getCurrentStart() {
      return this.data.dataArray.length;
    },
    setTotal(total) {
      this.setData({
        total
      });
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    initialize() {
      this.setData({
        dataArray: [],
        total: null
      });
    }
  }
});

export { paginationBev };

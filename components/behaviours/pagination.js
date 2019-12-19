const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    loading: false
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
        total: null,
        loading: false
      });
    }
  },
  isLocked() {
    return this.data.loading ? true : false;
  },
  locked() {
    this.setData({
      loading: true
    });
  },
  unLocked() {
    this.setData({
      loading: false
    });
  }
});

export { paginationBev };

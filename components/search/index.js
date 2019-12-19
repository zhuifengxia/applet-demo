import { KeywordModel } from "../../models/keyword.js";
import { BookModel } from "../../models/book.js";
import { paginationBev } from "../behaviours/pagination.js";
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: "",
    loading: false,
    loadingCenter: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      });
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return;
      }
      if (this._isLocked()) {
        return;
      }

      if (this.hasMore()) {
        this._locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          res => {
            this.setMoreData(res.books);
            this._unLocked();
          },
          () => {
            this._unLocked();
          }
        );
      }
    },

    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
      this.initialize();
    },
    onConfirm(event) {
      this._showLoadingCenter();
      this._showResult();
      const q = event.detail.value || event.detail.text;
      this.setData({
        q
      });
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      });
    },
    onDelete(event) {
      this._closeResult();
      this.initialize();
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    },
    _showResult() {
      this.setData({
        searching: true
      });
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ""
      });
    },
    _isLocked() {
      return this.data.loading ? true : false;
    },
    _locked() {
      this.setData({
        loading: true
      });
    },
    _unLocked() {
      this.setData({
        loading: false
      });
    }
  }
});

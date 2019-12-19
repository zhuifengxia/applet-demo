import { ClassicModel } from "../../models/classic.js";
import { BookModel } from "../../models/book.js";
const classicModel = new ClassicModel();
const bookModel = new BookModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  userAuthorized() {
    wx.getSetting({
      success: result => {
        if (result.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
            }
          });
        }
      }
    });
  },
  async getMyBookCount() {
    const bookCount = await bookModel.getMyBookCount();
    this.setData({
      bookCount: bookCount.count
    });
  },
  getMyFavor(event) {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      });
    });
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      });
    }
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: `/pages/about/about`
    });
  },
  onStudy(event) {
    wx.navigateTo({
      url: `/pages/course/course`
    });
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid;
    const type = event.detail.type;
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});

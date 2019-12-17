import { HTTP } from "../util/http.js"
class ClassicModel extends HTTP {
  getlatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious, sCallback) {
    //缓存是否有，无则请求并写入缓存
    let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  _setLatestIndex(index) {
    //同步写入缓存，还有异步写入缓存
    wx.setStorageSync("latest", index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync("latest")
    return index
  }

  _getKey(index) {
    let key = "classic_" + index
    return key
  }
}

export { ClassicModel }

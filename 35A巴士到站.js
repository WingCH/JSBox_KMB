// import moment.js (內置有)
var moment = require("moment");

//http://etav3.kmb.hk/?action=geteta&lang=tc&route=35A&bound=1 d&stop_seq=4&servicetype=01
var route = "35A";  //巴士號碼
var bound = "1";    //巴士方向
var stop_seq = "4"; //第幾個站 由0開始計

$ui.loading("Loading...")
$http.request({
  method: "GET",
  url:
    "http://etav3.kmb.hk/?action=geteta&lang=tc&route=" + route + "&bound=" + bound + "&stop_seq=" + stop_seq + "&servicetype=01",

  handler: function (resp) {
    var data = resp.data;
    console.log(resp)
    //arrivalTime
    var arrivalTimeList = [];
    for (var key in data.response) {
      var now = moment(new Date());
      var arrivalTime = moment(data.response[key].ex); //KMB App貌似係用"t"，但我依度用了"ex"

      //arrivalTime.diff(now, "m") -> 相差時間(分鐘)
      arrivalTimeList.push(arrivalTime.diff(now, "m").toString());
    }
    //console.log(arrivalTimeList);
    $ui.loading(false)
    uiList(arrivalTimeList);
  }
});


function uiList(arrivalTimeList) {
  $ui.render({
    views: [
      {
        type: "list",
        props: {
          data: arrivalTimeList.map(function (time) {
            if (time === "0") {
              return "即將/已到達";
            }
            return time + " 分鐘";
          }),

          header: {
            type: "label",
            props: {
              text: route + " 到站時間",
              textColor: $color("#AAAAAA"),
              align: $align.center,
              font: $font("bold", 25)
            }
          },

          footer: {
            type: "label",
            props: {
              height: 20,
              text: "Create by Wing",
              textColor: $color("#AAAAAA"),
              align: $align.center,
              font: $font(12)
            }
          }
        },
        layout: $layout.fill,
        events: {}
      }
    ]
  });
}

var LODOP; //声明为全局变量

function preview() {
  eval(`
  LODOP = getLodop();

  LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
  // LODOP.SET_PRINT_PAGESIZE(0, 2301.9, 1656.3, "A4");

  LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "228.6mm");
  LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "165.1mm");
  LODOP.ADD_PRINT_TEXT(458, 158, 210, 20, "发证日期");
  LODOP.ADD_PRINT_TEXT(502, 129, 34, 20, "2023");
  LODOP.ADD_PRINT_TEXT(546, 164, 190, 20, "证书编号");
  LODOP.ADD_PRINT_TEXT(133, 617, 200, 20, "单位");
  LODOP.ADD_PRINT_TEXT(179, 617, 200, 20, "姓名");
  LODOP.ADD_PRINT_TEXT(228, 617, 200, 20, "性别");
  LODOP.ADD_PRINT_TEXT(278, 617, 200, 20, "职称");
  LODOP.ADD_PRINT_TEXT(326, 617, 200, 20, "文化程度");
  LODOP.ADD_PRINT_TEXT(376, 617, 200, 20, "身份证号");
  LODOP.ADD_PRINT_TEXT(425, 617, 200, 20, "单位类型");
  LODOP.ADD_PRINT_TEXT(473, 617, 200, 20, "资格类型");
  LODOP.ADD_PRINT_TEXT(502, 272, 34, 20, "2025");
  LODOP.ADD_PRINT_TEXT(502, 182, 22, 20, "11");
  LODOP.ADD_PRINT_TEXT(502, 221, 22, 20, "11");
  LODOP.ADD_PRINT_TEXT(502, 322, 22, 20, "11");
  LODOP.ADD_PRINT_TEXT(502, 358, 22, 20, "11");
  LODOP.ADD_PRINT_SETUP_BKIMG(
    "<img border='0' src='http://81.68.204.177/img/1-1.png'>"
  );
  LODOP.SET_SHOW_MODE("PREVIEW_IN_BROWSE", 1);
  LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
  LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);
  LODOP.SET_SHOW_MODE("LANGUAGE", 0);
  LODOP.PREVIEW();
  `);
}

document.querySelector("#btn").addEventListener(
  "click",
  function () {
    preview();
  },
  false
);

document.querySelector("#btn2").addEventListener(
  "click",
  function () {
    LODOP = getLodop();

    LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
    LODOP.PRINT_INITA(0, 0, 864, 624, "111");
    // LODOP.SET_PRINT_PAGESIZE(2, 2301.9, 1656.3, "A4");

    LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "228.6mm");
    LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "165.1mm");

    LODOP.ADD_PRINT_SETUP_BKIMG(
      "<img border='0' src='http://81.68.204.177/img/11.png'>"
    );
    LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE", 1);
    LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
    LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);
    LODOP.SET_SHOW_MODE("LANGUAGE", 0);

    // LODOP.PRINT_INITA(0,0,870,634,"111");
    // LODOP.SET_PRINT_PAGESIZE(2,2302,1656,"A4");
    // LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='http://81.68.204.177/img/22.png'>");
    // LODOP.SET_SHOW_MODE("BKIMG_WIDTH","233.1mm");
    // LODOP.SET_SHOW_MODE("BKIMG_HEIGHT","165.63mm");
    // LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW",true);
    // LODOP.ADD_PRINT_TEXT(119,134,34,20,"2023");
    // LODOP.ADD_PRINT_TEXT(119,270,34,20,"2025");
    // LODOP.ADD_PRINT_TEXT(119,189,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,222,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,323,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,356,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(192,75,22,20,"0,0");
    // LODOP.ADD_PRINT_TEXT(185,105,110,33,"0,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(192,227,38,20,"0,2");
    // LODOP.ADD_PRINT_TEXT(192,278,38,20,"0,3");
    // LODOP.ADD_PRINT_TEXT(185,322,65,33,"0,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(232,75,22,20,"1,0");
    // LODOP.ADD_PRINT_TEXT(224,105,110,33,"1,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(232,227,38,20,"1,2");
    // LODOP.ADD_PRINT_TEXT(233,278,38,20,"1,3");
    // LODOP.ADD_PRINT_TEXT(223,322,65,33,"1,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(271,75,22,20,"2,0");
    // LODOP.ADD_PRINT_TEXT(264,105,110,33,"2,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(271,227,38,20,"2,2");
    // LODOP.ADD_PRINT_TEXT(271,278,38,20,"2,3");
    // LODOP.ADD_PRINT_TEXT(262,322,65,33,"2,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(311,75,22,20,"3,0");
    // LODOP.ADD_PRINT_TEXT(303,105,110,33,"3,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(310,227,38,20,"3,2");
    // LODOP.ADD_PRINT_TEXT(310,278,38,20,"3,3");
    // LODOP.ADD_PRINT_TEXT(303,322,65,33,"3,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(348,75,22,20,"4,0");
    // LODOP.ADD_PRINT_TEXT(341,105,110,33,"4,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(348,227,38,20,"4,2");
    // LODOP.ADD_PRINT_TEXT(348,278,38,20,"4,3");
    // LODOP.ADD_PRINT_TEXT(343,322,65,33,"4,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(388,75,22,20,"5,0");
    // LODOP.ADD_PRINT_TEXT(380,105,110,33,"5,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(389,227,38,20,"5,2");
    // LODOP.ADD_PRINT_TEXT(389,278,38,20,"5,3");
    // LODOP.ADD_PRINT_TEXT(381,322,65,33,"5,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(428,75,22,20,"6,0");
    // LODOP.ADD_PRINT_TEXT(420,105,110,33,"6,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(427,227,38,20,"6,2");
    // LODOP.ADD_PRINT_TEXT(427,278,38,20,"6,3");
    // LODOP.ADD_PRINT_TEXT(421,322,65,33,"6,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(470,75,22,20,"7,0");
    // LODOP.ADD_PRINT_TEXT(459,105,110,33,"7,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(466,227,38,20,"7,2");
    // LODOP.ADD_PRINT_TEXT(466,278,38,20,"7,3");
    // LODOP.ADD_PRINT_TEXT(459,322,65,33,"7,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(507,75,22,20,"8,0");
    // LODOP.ADD_PRINT_TEXT(497,105,110,33,"8,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(503,227,38,20,"8,2");
    // LODOP.ADD_PRINT_TEXT(504,278,38,20,"8,3");
    // LODOP.ADD_PRINT_TEXT(497,322,65,33,"8,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);

    // LODOP.ADD_PRINT_TEXT(119,579,34,20,"2023");
    // LODOP.ADD_PRINT_TEXT(119,715,34,20,"2025");
    // LODOP.ADD_PRINT_TEXT(119,629,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,662,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,763,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(119,796,22,20,"11");
    // LODOP.ADD_PRINT_TEXT(192,515,22,20,"0,0");
    // LODOP.ADD_PRINT_TEXT(185,545,110,33,"0,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(192,667,38,20,"0,2");
    // LODOP.ADD_PRINT_TEXT(192,718,38,20,"0,3");
    // LODOP.ADD_PRINT_TEXT(185,762,65,33,"0,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(232,515,22,20,"1,0");
    // LODOP.ADD_PRINT_TEXT(224,545,110,33,"1,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(232,667,38,20,"1,2");
    // LODOP.ADD_PRINT_TEXT(233,718,38,20,"1,3");
    // LODOP.ADD_PRINT_TEXT(223,762,65,33,"1,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(271,515,22,20,"2,0");
    // LODOP.ADD_PRINT_TEXT(264,545,110,33,"2,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(271,667,38,20,"2,2");
    // LODOP.ADD_PRINT_TEXT(271,718,38,20,"2,3");
    // LODOP.ADD_PRINT_TEXT(262,762,65,33,"2,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(311,515,22,20,"3,0");
    // LODOP.ADD_PRINT_TEXT(303,545,110,33,"3,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(310,667,38,20,"3,2");
    // LODOP.ADD_PRINT_TEXT(310,718,38,20,"3,3");
    // LODOP.ADD_PRINT_TEXT(303,762,65,33,"3,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(348,515,22,20,"4,0");
    // LODOP.ADD_PRINT_TEXT(341,545,110,33,"4,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(348,667,38,20,"4,2");
    // LODOP.ADD_PRINT_TEXT(348,718,38,20,"4,3");
    // LODOP.ADD_PRINT_TEXT(343,762,65,33,"4,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(388,515,22,20,"5,0");
    // LODOP.ADD_PRINT_TEXT(380,545,110,33,"5,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(389,667,38,20,"5,2");
    // LODOP.ADD_PRINT_TEXT(389,718,38,20,"5,3");
    // LODOP.ADD_PRINT_TEXT(381,762,65,33,"5,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(428,515,22,20,"6,0");
    // LODOP.ADD_PRINT_TEXT(420,545,110,33,"6,1");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
    // LODOP.ADD_PRINT_TEXT(427,667,38,20,"6,2");
    // LODOP.ADD_PRINT_TEXT(427,718,38,20,"6,3");
    // LODOP.ADD_PRINT_TEXT(421,762,65,33,"6,4");
    // LODOP.SET_PRINT_STYLEA(0,"FontSize",7);

    // LODOP.ADD_PRINT_TEXT(565,696,34,20,"2028");
    // LODOP.ADD_PRINT_TEXT(565,751,22,20,"1");
    // LODOP.ADD_PRINT_TEXT(565,796,22,20,"1");

    LODOP.PRINT_DESIGN();
  },
  false
);

document.querySelector("#btn3").addEventListener(
  "click",
  function () {
    LODOP = getLodop();

    LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
    // LODOP.SET_PRINT_PAGESIZE(2, 2301.9, 1656.3, "A4");

    LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "228.6mm");
    LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "165.1mm");

    LODOP.PRINT_INITA(0, 0, 864, 624, "111");

    LODOP.ADD_PRINT_TEXT(458, 158, 210, 20, "发证日期");
    LODOP.ADD_PRINT_TEXT(502, 129, 34, 20, "2023");
    LODOP.ADD_PRINT_TEXT(546, 164, 190, 20, "证书编号");
    LODOP.ADD_PRINT_TEXT(133, 617, 200, 20, "单位");
    LODOP.ADD_PRINT_TEXT(179, 617, 200, 20, "姓名");
    LODOP.ADD_PRINT_TEXT(228, 617, 200, 20, "性别");
    LODOP.ADD_PRINT_TEXT(278, 617, 200, 20, "职称");
    LODOP.ADD_PRINT_TEXT(326, 617, 200, 20, "文化程度");
    LODOP.ADD_PRINT_TEXT(376, 617, 200, 20, "身份证号");
    LODOP.ADD_PRINT_TEXT(425, 617, 200, 20, "单位类型");
    LODOP.ADD_PRINT_TEXT(473, 617, 200, 20, "资格类型");
    LODOP.ADD_PRINT_TEXT(502, 272, 34, 20, "2025");
    LODOP.ADD_PRINT_TEXT(502, 182, 22, 20, "11");
    LODOP.ADD_PRINT_TEXT(502, 221, 22, 20, "11");
    LODOP.ADD_PRINT_TEXT(502, 322, 22, 20, "11");
    LODOP.ADD_PRINT_TEXT(502, 358, 22, 20, "11");

    LODOP.ADD_PRINT_SETUP_BKIMG(
      "<img border='0' src='http://81.68.204.177/img/1-1.png'>"
    );
    LODOP.SET_SHOW_MODE("SETUP_IN_BROWSE", 1);
    LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
    LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);
    LODOP.SET_SHOW_MODE("LANGUAGE", 0);

    LODOP.PRINT_SETUP();
  },
  false
);


var LODOP,P_ID="",TaskID1,TaskID2,t,waiting=false,c=0,loop=0; //声明为全局变量 
function PrintWaitLoop() {
  if (!waiting) {
    LODOP = getLodop();
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得打印状态2");
    LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印的页面部分内容");
    LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
    if (LODOP.CVERSION) {
      LODOP.On_Return_Remain = true;
      LODOP.On_Return = function (TaskID, Value) {
        if (TaskID == TaskID1) {
          P_ID = Value;
          if (P_ID != "") {
            waiting = true;
            c = 0;
            loop = loop + 1;
            setTimeout("PrintWaitLoop()", 200);
          } else {
            document.getElementById("T14").value = "已停止循环！";
          }
        } else if (TaskID == TaskID2) {
          if (Value == 0) {
            waiting = false;
          }
          setTimeout("PrintWaitLoop()", 200);
        }
      };
      TaskID1 = LODOP.PRINTA();
    } else {
      P_ID = LODOP.PRINTA();
      if (P_ID != "") {
        waiting = true;
        c = 0;
        loop = loop + 1;
        setTimeout("PrintWaitLoop()", 200);
      } else {
        document.getElementById("T14").value = "已停止循环！";
      }
    }
  } else {
    c = c + 1;
    document.getElementById("T14").value =
      "正打印第" + loop + "个任务(JOB代码" + P_ID + ")等待：" + c / 5 + "秒";
    if (LODOP.CVERSION) {
      TaskID2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID);
    } else {
      if (!LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID)) waiting = false; //以是否还在队列为准
      setTimeout("PrintWaitLoop()", 200);
    }
  }
}

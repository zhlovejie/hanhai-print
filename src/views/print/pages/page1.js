export default {
  title: "版面1",
  name: "page1",
  bgimg: "http://81.68.204.177:9999/static/download/page1.png",
  components: [
    {
      top: "408",
      left: "152",
      w: "194",
      h: "20",
      remark: "发证日期",
      val: "",
      type: "date-val",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "454",
      left: "134",
      w: "38",
      h: "20",
      remark: "年份",
      val: "",
      type: "date",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "454",
      left: "184",
      w: "25",
      h: "20",
      remark: "月",
      val: "",
      type: "month",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "454",
      left: "225",
      w: "25",
      h: "20",
      remark: "日",
      val: "",
      type: "day",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },

    {
      top: "454",
      left: "277",
      w: "38",
      h: "20",
      remark: "年",
      val: "",
      type: "year",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "454",
      left: "324",
      w: "25",
      h: "20",
      remark: "月",
      val: "",
      type: "month",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "454",
      left: "361",
      w: "25",
      h: "20",
      remark: "日",
      val: "",
      type: "day",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },

    {
      top: "500",
      left: "204",
      w: "25",
      h: "20",
      remark: "月",
      val: "",
      type: "month",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "500",
      left: "241",
      w: "25",
      h: "20",
      remark: "日",
      val: "",
      type: "day",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },

    {
      top: "544",
      left: "171",
      w: "194",
      h: "20",
      remark: "证书编号",
      val: "",
      ext: {
        //居中
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"Alignment",2); ',
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "130",
      left: "614",
      w: "220",
      h: "20",
      remark: "单位",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "174",
      left: "614",
      w: "220",
      h: "20",
      remark: "姓名",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "222",
      left: "614",
      w: "220",
      h: "20",
      remark: "性别",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "272",
      left: "614",
      w: "220",
      h: "20",
      remark: "职称",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "321",
      left: "614",
      w: "220",
      h: "20",
      remark: "文化程度",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "370",
      left: "614",
      w: "220",
      h: "20",
      remark: "身份证号",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "417",
      left: "614",
      w: "220",
      h: "20",
      remark: "单位类型",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
    {
      top: "467",
      left: "614",
      w: "220",
      h: "20",
      remark: "资格类型",
      val: "",
      ext: {
        cmd: [
          'LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");',
          'LODOP.SET_PRINT_STYLEA(0,"FontSize",10);',
        ],
      },
    },
  ],
};

import chartjsPluginColorschemes from "chartjs-plugin-colorschemes";

//グラフ描写に関わるオプション
export const graphOptions = {
  maintainAspectRatio: false,
  responsive: false,
  plugin: {
    colorschemes: {
      scheme: chartjsPluginColorschemes,
    },
  },
};

/* 
    関数名：fetchGraphData
    機能：選択された都道府県データを取得しグラフのstateへ格納する
    引数：都道府県コード(prefCode),都道府県名(preName)
    戻り値：グラフデータ（オブジェクト）
*/

export const fetchGraphData = async (prefCode: number, preName: string) => {
  try {
    const response = await fetch(`/api/population/${prefCode}`);
    const result = await response.json();
    //key=year => Array<number>
    const labelArray: Array<number> = [...result.data.result.data[0].data].map(
      (value) => value.year
    );
    //key=value => Array<string>
    const datArray: Array<string> = [...result.data.result.data[0].data].map(
      (v) => v.value as string
    );
    const dataset = {
      label: preName,
      data: datArray,
      fill: false,
    };
    const resultObject = { fetchlabel: labelArray, fetchdata: dataset };
    return resultObject;
  } catch (e) {
    throw e;
  }
};

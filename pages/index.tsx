import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchGraphData } from "../customHooks/fetchGraph";
import { graphOptions } from "../graph_config/graphOption";

const Home: NextPage = () => {
  //都道府県一覧のチェックボックス
  type dataType =
    | []
    | [
        {
          prefCode: number;
          prefName: string;
        }
      ];
  const [datas, setData] = useState<dataType>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/api/prefectures");
        const resArray = await response.json();
        setData(resArray.data.result);
      };
      fetchData();
    } catch (e) {
      alert("都道府県一覧の取得に失敗しました");
    }
  }, []);

  //人口推移グラフ
  type stateType = {
    labels: Array<number>;
    datasets: Array<object>;
  };
  const [graph, setGraph] = useState<stateType>({ labels: [], datasets: [] });
  const { labels, datasets } = graph;

  const onchangeCheck = (
    prefCode_: number,
    prefName_: string,
    checkStatus: boolean
  ) => {
    //選択された都道府県のグラフを表示
    if (checkStatus) {
      const getData = async () => {
        const result = await fetchGraphData(prefCode_, prefName_);
        setGraph({
          labels: [...result.fetchlabel],
          datasets: [...graph.datasets, result.fetchdata],
        });
      };
      getData();
    }
    //選択解除された都道府県のグラフを削除
    else {
      // @ts-ignore
      const index = datasets.findIndex((value) => value.label === prefName_);
      datasets.splice(index, 1);
      setGraph({ labels: labels, datasets: datasets });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Population composition</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <header>
        <h2 className={styles.title}>都道府県別人口構成</h2>
      </header>

      <main className={styles.main}>
        <p className={styles.description}>都道府県一覧</p>
        <div className={styles.grid}>
          {datas.map((pre) => (
            <div key={pre.prefCode}>
              <input
                type="checkbox"
                onChange={(event) =>
                  onchangeCheck(
                    pre.prefCode,
                    pre.prefName,
                    event.target.checked
                  )
                }
              />
              <label>{pre.prefName}</label>
            </div>
          ))}
        </div>
        <p className={styles.description}>人口構成グラフ</p>
        <Line
          width={500}
          height={400}
          data={graph}
          options={graphOptions}
          redraw
        />
      </main>

      <footer className={styles.footer}>Crested by kazushi</footer>
    </div>
  );
};
export default Home;

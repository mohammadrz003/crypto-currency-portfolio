import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const AssetsDoughnutChart = ({ chartData }) => {
  if (Object.keys(chartData).length === 0) {
    return (
      <div className="flex-1 p-4 bg-white rounded-md">something has failed</div>
    );
  }

  const legendMargin = {
    id: "legendMargin",
    beforeInit(chart, legend, options) {
      console.log(chart.legend.fit);
      const fitValue = chart.legend.fit;

      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 40);
      };
    },
  };

  console.log(chartData.datasets[0].data);

  return (
    <div className="flex-1">
      <h4 className="text-xl font-semibold text-dark py-1">Assets chart</h4>
      <div className="bg-white p-4 rounded-md mt-4 w-full">
        {chartData.datasets[0].data.reduce((a, b) => a + b, 0) === 0 ? (
          <>
            <img className="w-full" src="/assets/trader-man.svg" alt="" />
            <p className="text-center mt-5 text-gray-500">add value to watch the chart</p>
          </>
        ) : (
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                    paddingTop: 50,
                  },
                },
                layout: {
                  padding: 20,
                },
              },
            }}
            // plugins={[legendMargin]}
          />
        )}
      </div>
    </div>
  );
};

export default AssetsDoughnutChart;

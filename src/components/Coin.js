import React from "react";
import { currencyFormatter } from "../util/Format";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement
} from 'chart.js';
import './Coin.css';

ChartJS.register(
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement
)

function Coin({ name, icon, price, link, prices, onClick }) {
    const goToLink = (url) => {
        window.open(url.link, "_blank");
    }
    let timeLine = [];
    let timelineFinal = [];
    let today = new Date();
    timeLine.push((today.getHours()).toString());
    
    for(let i=24; i>0; i--) {
        if(Number(timeLine[i]) - i > 0) {
            timeLine.push(((today.getHours() - i).toString()));
        }
        else {
            timeLine.push((23 + (today.getHours() - i)).toString());
        }
    }

    timeLine.forEach(element => {
        timelineFinal.push(element.toString() + ":00");
    });

    console.log(timeLine);
    const data = {
        // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
        labels: timelineFinal,
        datasets: [{
            labels: 'Prices',
            data: prices,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua'
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            x: {
                // min: 0,
                // max: 50
            }
        }
    }
    return (
        <div className="coin" onClick={onClick}>
            <div class="coinTitle">
                <h1>{name}</h1>
                <img src={icon} onClick={() => goToLink({ link })}></img>
                <h3>price: {currencyFormatter.format(price)}</h3>
            </div>
            <div class="coinChart">
                <Line 
                data={data}
                options={options}>

                </Line>
            </div>
        </div>
        /* <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line data={prices} options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Price Over the Last 24 Hours"
                    },
                    legend: {
                        display: false
                    }
                }
            }}
            />
        </div> */
    )
}

export default Coin;
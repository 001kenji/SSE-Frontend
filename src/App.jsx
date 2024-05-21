import React,{ useEffect, useRef, useState } from 'react'
import { IoBarChartOutline } from "react-icons/io5";
import { GiMoonClaws } from "react-icons/gi";
import { IoSunnySharp } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import './App.css'
import CanvasJSReact from '@canvasjs/react-stockcharts';

function App() {
  var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
  const [Theme,setTheme] = useState('dark')
  const [Watchlist,setWatchlist] = useState('Watchlist')
  const [ShowWatchlist,setShowWatchlist]= useState(false)
  const [StockTitle,setStockTitle] = useState('APPL')
  const [chartSettings,setchartSettings] = useState({
    'ChartTypes' : 'line',
    'chartThemes' : 'light1',
    'Indicators' : 'SMA'
  })
  const eventSourceRef = useRef(null);
  const [OptionChartValue,SetOptionChartValue] = useState([
    { x: new Date("2022-01-01"), y: 71 },
    { x: new Date("2022-02-01"), y: 55 },
    { x: new Date("2022-03-01"), y: 50 },
    { x: new Date("2022-04-01"), y: 65 },
    { x: new Date("2022-05-01"), y: 95 },
    { x: new Date("2022-06-01"), y: 68 },
    { x: new Date("2022-07-01"), y: 28 },
    { x: new Date("2022-08-01"), y: 34 },
    { x: new Date("2022-09-01"), y: 14 },
    { x: new Date("2022-10-01"), y: 71 },
    { x: new Date("2022-11-01"), y: 55 },
    { x: new Date("2022-12-01"), y: 50 },
    { x: new Date("2023-01-01"), y: 34 },
    { x: new Date("2023-02-01"), y: 50 },
    { x: new Date("2023-03-01"), y: 50 },
    { x: new Date("2023-04-01"), y: 95 },
    { x: new Date("2023-05-01"), y: 68 },
    { x: new Date("2023-06-01"), y: 28 },
    { x: new Date("2023-07-01"), y: 34 },
    { x: new Date("2023-08-01"), y: 65 },
    { x: new Date("2023-09-01"), y: 55 },
    { x: new Date("2023-10-01"), y: 71 },
    { x: new Date("2023-11-01"), y: 55 },
    { x: new Date("2023-12-01"), y: 50 }
  ])
  const [StockValue,setStockValue] = useState(0)
  const [Now,SetNow] = useState({
    'year' : 2024,
    'month' : 1,
    'day' : 1
  })
  function ResetWatchlist(props) {
      setWatchlist(props)
  }
  const TradeMarks = [
    ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "FB", "BRK.B", "JNJ", "NVDA", "JPM"], 
    ["DJIA", "SPX", "NDX", "RUT", "FTSE", "DAX", "CAC", "NIKKEI", "HSI", "ASX"], 
    ["GC", "SI", "CL", "NG", "HG", "ZC", "ZW", "ZS", "LE", "HE"],
    ["BTC", "ETH", "BNB", "XRP", "ADA", "DOGE", "SOL", "DOT", "LTC", "BCH"],
    ["SPY", "IVV", "VOO", "QQQ", "DIA", "IWM", "EEM", "XLF", "XLK", "VNQ"]
  ]
  function CreateRandomval (props) {
    var val = Math.floor(Math.random() * 100 - (Number(props) + 20))
    var valArray = String(val)
    
    return [val,valArray[0]]
  }
  function ToongleTheme() {
    setTheme(Theme == 'light' ? 'dark' : 'light')
  }

  var index = Watchlist == 'Watchlist'? 0 : Watchlist == 'Indices' ? 1 : Watchlist == 'Commodities' ? 2 : Watchlist == 'Cryptocurrencies' ? 3 : 4

  function ToogleMarksSelection(prop1,prop2) {
    console.log(prop1,prop2)
    setStockValue(prop2)
    setStockTitle(prop1)
  }

  const TradeMarksOption = TradeMarks[index].map((items,i) => {
      var negateVal = CreateRandomval(i)
    return (
      <div key={i} onClick={() => ToogleMarksSelection(items,negateVal[0])} className='flex border-b-[1px] border-b-slate-900 dark:border-b-slate-400 flex-row justify-between w-full px-4 dark:hover:text-slate-900 duration-500 transition-all hover:translate-x-4 py-1  bg-transparent hover:bg-slate-800 hover:bg-opacity-50 cursor-pointer dark:hover:bg-slate-300 dark:hover:bg-opacity-60'>
          <div className=' '>
            <p  className=' font-semibold'>{items}</p>
          </div>
          <div>
            <p className=' font-semibold text-sm mx-auto'>{Math.floor(Math.random() * 100)}</p>
            <p  className={` w-fit mx-3 ${negateVal[1] != '-' ? 'bg-green-600' : 'bg-red-600'} text-right rounded-sm my-auto py-0 text-sm px-2 bg-opacity-70 dark:text-slate-200 text-slate-900 font-semibold`}>{negateVal[0]}</p>
            
            </div>
      </div>
    )
  })
  const TradeMarksChange = (event) => {
    const {value} = event.target 
    setWatchlist(value)
  }

  const ChartSettingsChange = (event) => {
    const {name, value} = event.target 
    setchartSettings((e) => {
      return {
        ...e,
        [name] : value
      }
    })
    
  }

  
  const options = {
    theme: chartSettings.chartThemes,
    title: {
      text: "Server Sent Event Chart"
    },
    charts: [{
      axisY: {
          title: "Price"
      },
      data: [{
        type: chartSettings.ChartTypes,
        dataPoints: OptionChartValue
      }]
    }],
    navigator: {
      
      slider: {
        minimum: new Date("2016-07-01"),
        maximum: new Date().getTime() + 60000
      }
    },
    interactivityEnabled: true,
    }

      function GetData() {
        window.open(`${import.meta.env.VITE_Server}/data/`)
      }
      useEffect(() => {
        if (!eventSourceRef.current) {
          eventSourceRef.current = new EventSource(import.meta.env.VITE_SSE);
    
          eventSourceRef.current.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            var val = {
              x: new Date(newData.x),
              y: newData.y
          }
          SetOptionChartValue([...OptionChartValue,val])
          console.log(OptionChartValue)
          console.log(OptionChartValue.length)
          };
          options.navigator.slider.minimum = options.charts[0].data[0].dataPoints[0].x;
          options.navigator.slider.maximum = options.charts[0].data[0].dataPoints[options.charts[0].data[0].dataPoints.length - 1].x;

          eventSourceRef.current.onerror = (error) => {
            //console.error('EventSource failed:', error);
          };}
      },[])
   
      

  return (
    <>
      <div id='mainNav' className={` overflow-x-hidden overflow-y-auto gap-6   overflow-auto lg:overflow-hidden flex flex-col lg:flex-row min-h-full h-screen w-full ${Theme}`}>
          {/* sidenav bar */}
          <div className=' z-50 align-middle flex flex-row lg:flex-col gap-2 justify-around lg:justify-start py-2 px-1 bg-slate-100 lg:h-full lg:min-h-full border-[1px] border-transparent lg:w-fit  lg:min-w-fit w-full lg:max-w-[100px] dark:bg-slate-900 dark:text-slate-100 duration-500 transition-all'>
                <blockquote onClick={GetData} className=' hover:text-sky-700 transition-all duration-500 cursor-pointer flex flex-col gap-0 align-middle justify-center'>
                  <p className=' flex align-middle m-auto'><IoBarChartOutline/></p>
                  <p className=' mx-auto font-semibold text-sm'>Data</p>
                </blockquote>
                <blockquote onClick={() => setShowWatchlist((e) => !e)} className=' hover:text-sky-700 transition-all duration-500 cursor-pointer flex flex-col gap-0 align-middle justify-center'>
                  <p className=' text-blue-600 flex align-middle m-auto'><FaHeart/></p>
                  <p className=' mx-auto font-semibold text-sm'>Watchlist</p>
                </blockquote>
                <blockquote onClick={ToongleTheme} className=' hover:text-sky-700 transition-all duration-500 cursor-pointer flex flex-col gap-0 align-middle justify-center'>
                  <p className={` ${Theme == 'light' ? ' text-slate-800' : 'text-slate-100'} animate-pulse flex align-middle m-auto`}>{Theme == 'light' ? <IoSunnySharp/> : <GiMoonClaws/>}</p>
                  <p className=' mx-auto font-semibold text-sm'>Theme</p>
                </blockquote>
          </div>

          {/* left wing div*/}
          <div className={` lg:mx-0 mx-auto  border-t-[1px] lg:min-w-[200px] lg:border-l-[1px] lg:border-l-slate-300 lg:border-t-transparent border-slate-300 lg:border-slate-900 dark:bg-slate-900 dark:text-slate-100 duration-500 transition-all flex flex-col ${ShowWatchlist ? '  lg:translate-y-0 translate-x-0' : ' translate-x-[150%] lg:translate-x-0 lg:translate-y-[100%]'}   gap-0 w-[90%]   lg:w-fit lg:h-full lg:min-h-full h-fit lg:justify-start justify-around bg-slate-100 `}>
              <select onChange={TradeMarksChange} className=' bg-transparent text-center px-0 cursor-pointer outline-none font-semibold mx-auto p-2 text-sm lg:text-base'>
                <option className=' bg-transparent dark:text-slate-900' value="Watchlist">Watchlist</option>
                <option className=' bg-transparent dark:text-slate-900' value="Indices">Indices</option>
                <option className=' bg-transparent dark:text-slate-900' value="Commodities">Commodities</option>
                <option className=' bg-transparent dark:text-slate-900' value="Cryptocurrencies">Cryptocurrencies</option>
                <option className=' bg-transparent dark:text-slate-900' value="ETFs">ETFs</option>
              </select>
        
              <div className=' flex flex-col align-middle justify-around '>
              {TradeMarksOption}
              </div>
        
        
          </div>
          {/* center wing div */}
          <div className={` flex flex-row lg:overflow-auto lg:whitespace-nowrap min-h-fit h-fit mb-10 transition-all duration-300 ${ShowWatchlist ? ' translate-x-0 translate-y-0' : ' -translate-y-20 lg:translate-y-0 lg:-translate-x-20'} my-3 lg:my-0 bg-opacity-30 align-middle justify-center content-center bg-slate-500 h-fit min-h-[400px] lg:h-full flex w-[90%] mx-auto `}>
              <div className=' my-4 lg:my-auto w-full relative h-fit  align-middle max-h-[400px] '>
                  <CanvasJSStockChart  nonce='eyJhbGciOiJadaSDFsdfsf5cCI6IkpXVCJ9=='  options = {options} onref = {ref => this.stockchart = ref} />
              </div>
          </div>

          {/* right wing div */}
            <div className=' mt-32 lg:mt-0 z-50 align-middle flex flex-col gap-2 justify-around lg:justify-start py-2 px-1 bg-slate-100 lg:h-full lg:min-h-full border-[1px] border-transparent lg:w-fit  lg:min-w-[200px] w-[90%] mx-auto lg:mx-0 lg:max-w-[100px] dark:bg-slate-900 dark:text-slate-100 duration-500 transition-all'>
                <div className=' transition-all duration-500 bg-transparent flex flex-row justify-around w-full '>
                <p className={` ${Theme == 'light' ? ' text-slate-800' : 'text-slate-100'} animate-bounce  flex align-middle m-auto`}>{<LuBellRing/>}</p>
                <p className={` ${Theme == 'light' ? ' text-purple-700' : 'text-slate-100'}  flex align-middle m-auto`}>{<FaHeart/>}</p>
                
                </div>
                <div className=' transition-all duration-500 bg-transparent flex flex-col justify-around w-full '>
                  
                  <p className=' font-semibold font-serif text-sm text-center lg:text-base'>{StockTitle}</p>
                 
                  <div className=' flex flex-row w-full justify-around bg-transparent'>
                       <p>{StockValue}</p>
                      <p className=' text-red-700 dark:text-pink-600'>{Math.floor((StockValue / 220 ) * 100)}%</p>
                  </div>
                  <div className=' flex flex-row w-full justify-around bg-transparent my-2'>
                    <button className=' hover:bg-transparent hover:ring-1 dark:hover:ring-pink-500 transition-all duration-500  py1 px-2 text-slate-900 rounded-sm bg-sky-500 min-w-[60px] font-semibold dark:text-slate-100 '>Buy</button>
                    <button className=' hover:bg-transparent hover:ring-1 dark:hover:ring-sky-500 transition-all duration-500  py1 px-2 text-slate-900 rounded-sm bg-red-500 min-w-[60px] font-semibold dark:text-slate-100 '>Sell</button>

                  </div>

                  <div className=' flex flex-col h-fit gap-4 w-full justify-around bg-transparent my-2'>
                      
                      <div className=' flex flex-col gap-2 w-full justify-around'>
                            <p className=' mx-auto w-fit font-mono font-semibold text-sm lg:text-base'>ChartTypes</p>
                            <select onChange={ChartSettingsChange} className=' dark:text-slate-100 p-1 w-fit mx-auto ring-1 text-center font-semibold outline-none ring-pink-500 rounded-sm bg-transparent' name="ChartTypes" id="">
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="line">Line</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="area">Area</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="spline">Spline</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="stepLine">StepLine</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="column">Column</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="splineArea">SplineArea</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="candlestick">Candlestick</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="ohlc">Ohlc</option>
                            </select>
                      </div>
                      <div className=' flex flex-col gap-2 w-full justify-around'>
                            <p className=' mx-auto w-fit font-mono font-semibold text-sm lg:text-base'>chartThemes</p>
                            <select onChange={ChartSettingsChange} className=' p-1 w-fit mx-auto ring-1 text-center font-semibold outline-none ring-pink-500 rounded-sm bg-transparent' name="chartThemes" id="">
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="light1">light1</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="light2">light2</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="dark1">dark1</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="dark2">dark2</option>
                            </select>
                      </div>

                      <div className=' flex flex-col gap-2 w-full justify-around'>
                            <p className=' mx-auto w-fit font-mono font-semibold text-sm lg:text-base'>Indicators</p>
                            <select onChange={ChartSettingsChange} className=' p-1 w-fit mx-auto ring-1 text-center font-semibold outline-none ring-pink-500 rounded-sm bg-transparent' name="Indicators" id="">
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="SMA">SMA</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="EMA">EMA</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="Bollinger Bands">Bollinger Bands</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="RSI">RSI</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="MACD">MACD</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="ATR">ATR</option>
                              <option className=' dark:text-slate-900 font-semibold text-sm' value="Stochastic Oscillator">Stochastic Oscillator</option>
                            </select>
                      </div>
                      
                  </div>

                </div>
            </div>
          
          
      </div>       
    </>
  )
}

export default App

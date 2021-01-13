import React, {useState} from 'react'
import DisplayTime from './DisplayTimeComponent'
import ControlButton from './ControlButtonComponent'
import DisplayLabTime from './DisplayLapTimeComponent'
import { Row, Col } from 'antd';
import { CaretRightOutlined, PauseOutlined, FieldTimeOutlined, ReloadOutlined } from '@ant-design/icons';

function StopWatchComponent() {
	const [time, setTime] = useState({hour: 0, minute: 0, second: 0, millisec: 0})
	const [intervalTime, setintervalTime] = useState()
	const [status, setStatus] = useState(0)
	const [listLapTime, setlistLapTime] = useState([])

	let currentHour = time.hour
	let currentMin = time.minute
	let currentSecond = time.second
	let currentMilliSec = time.millisec

	const runWatch = () => {
		currentMilliSec++
		if (currentMin === 60) {
			currentHour++
			currentMin = 0
		}
		if (currentSecond === 60) {
			currentMin++
			currentSecond = 0
		}
		if (currentMilliSec === 100) {
			currentSecond++
			currentMilliSec = 0
		}
		let updateTime = {
			hour: currentHour,
			minute: currentMin,
			second: currentSecond,
			millisec: currentMilliSec
		}
		return setTime(prevTime => ({...prevTime, ...updateTime}))
	}

	const startTime = () => {
		if (status === 0) {
			setStatus(1)
			runWatch()
			setintervalTime(setInterval(runWatch, 10))
		}
	}

	const stopTime = () => {
		if (status === 1) {
			setStatus(2)
			clearInterval(intervalTime)
		}
	}

	const resumeTime = () => {
		if(status === 2){
			setStatus(1)
			runWatch()
			setintervalTime(setInterval(runWatch, 10))
		}
	}

	const lapTime = () => {
		let newLapTime = {
			key: listLapTime.length + 1,
			lap: listLapTime.length + 1,
			time: `${time.hour === 0 ? '' : time.hour < 10 ? "0"+time.hour+":" : time.hour+":"}${time.minute < 10 ? "0"+time.minute : time.minute}:${time.second < 10 ? "0"+time.second : time.second}:${time.millisec < 10 ? "0"+time.millisec : time.millisec}`,
		}
		console.log(listLapTime[0])
		setlistLapTime(prevListLapTime => ([newLapTime, ...prevListLapTime]))
	}

	const resetTime = () => {
		setStatus(0)
		setTime({hour: 0,	minute: 0, second: 0,	millisec: 0})
		setlistLapTime([])
	}

	let displayControlButton
	// status = 0 , stopwatch is not running
	// status = 1 , stopwatch is running 
	// status = 2 , stopwatch is running but user press stop button
	if (status === 0) {
		displayControlButton = <Row gutter={[16,16]} justify="center"><Col><ControlButton handleClick={startTime} icon={<CaretRightOutlined />} styleBTN='start-button' labelBTN='Start' /></Col></Row>
	}else if(status === 1){
		displayControlButton = <Row gutter={[16,16]} justify="center"> 
			<Col><ControlButton handleClick={lapTime} icon={<FieldTimeOutlined />} styleBTN='lap-button' labelBTN='Lap' /></Col>
			<Col><ControlButton handleClick={stopTime} icon={<PauseOutlined />} styleBTN='pause-button' labelBTN='Pause' /></Col>
		</Row>
	}else if(status === 2){
		displayControlButton = <Row gutter={[16, 16]} justify="center">
			<Col><ControlButton handleClick={resetTime} icon={<ReloadOutlined />} styleBTN='reset-button' labelBTN='Reset' /></Col>
			<Col><ControlButton handleClick={resumeTime} icon={<CaretRightOutlined />} styleBTN='resume-button' labelBTN='Resume' /></Col>
		</Row>
	}

	return (
		<div className="container-stopwatch">	
			<div>
				<DisplayTime time={time} />
				{displayControlButton}
			</div>
			<hr />
			<DisplayLabTime listLapTime={listLapTime} />
		</div>
	)
}

export default StopWatchComponent

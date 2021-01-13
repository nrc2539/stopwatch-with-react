import React from 'react'
import { Button } from 'antd';

function ControlButtonComponent({handleClick, labelBTN, styleBTN, icon}) {
	return (
		<div>
			<Button type="primary" icon={icon ? icon : ''} shape="round" size="large" className={styleBTN} onClick={handleClick}>{labelBTN}</Button>
		</div>
	)
}

export default ControlButtonComponent

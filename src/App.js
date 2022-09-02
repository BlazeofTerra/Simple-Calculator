import './App.css';
import React, {useState} from "react";
import {evaluate} from "mathjs";

export default function App() {
	const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '=', 'C']
	const [tempNum, storeNum] = useState("");
	const [sum, setSum] = useState([]);
	const [dNum, displayNum] = useState(0);
	const [dSum, displaySum] = useState("");

	function CalcButtons(button) {
		storeNum(tempNum + button)
		displaySum(dSum + button)
		
		if(!isNaN(button) || button === ".") {
			displayNum(tempNum + button)
		}

		if(button === "=") {
			let finalNum = "";

			sum.forEach(element => {
				finalNum = finalNum + ` ${element}`;
			});
			
			finalNum = finalNum + ` ${tempNum}`;

			try {
				displayNum(evaluate(finalNum))
			} catch(error) {
				console.log(error)
				setSum([])
				storeNum("")
				displayNum(0)
				displaySum("")
			}
		} else if(button === "C") {
			setSum([])
			storeNum("")
			displayNum(0)
			displaySum("")
		} else if(isNaN(button) && button !== "." && button !== "C") {
			setSum([...sum, tempNum, button])
			storeNum("")
		}
	}

	return (
		<div id="calcOuterOuter">
			<div id="calcOuter">
				<div id="sum">
					<h1>{dNum}</h1>
					<p>{dSum}</p>
				</div>
				<div id="buttons">
					{buttons.map((button, index) => {
						return (
							<button key={index} onClick={() => CalcButtons(button)}>{button}</button>
						)
					})}
				</div>
			</div>
		</div>
	);
}
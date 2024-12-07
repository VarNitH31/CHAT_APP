import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/Button";

function Room() {
	const { roomId, userName } = useParams();
	const [messages, setMessages] = useState([ ]);
	const wsRef = useRef();
	const inputRef = useRef();

	const navigate=useNavigate();

	const handleLeaveRoom =()=>{
		navigate(-1)
	}

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");
		ws.onmessage = (event) => {
            //@ts-ignore
            const data = JSON.parse(event.data);
            console.log(data);
			setMessages((m) => [...m, data]);
		};
		//@ts-ignore
		wsRef.current = ws;

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					type: "join",
					payload: {
						roomId: roomId,
                        userName:userName
					},
				})
			);
		};

		return () => {
			ws.close();
		};
	}, []);
	return (
		<>
			<div className="h-screen bg-black flex flex-col">
			<nav className="w-full text-white p-7 bg-slate-500 ">
				<div className="flex justify-between" >
					<span className="font-semibold text-xl " > Room Id: {roomId}</span>
					<Button variant="negative" sizes="md" text="Leave Room" onClick={handleLeaveRoom} ></Button>
				</div>
			</nav>
				<div className="h-[95vh] my-10 mx-5 flex flex-col">
					{messages.map((data,index) => {
                        if (data.userName === userName){return (
						<div key={index} className="flex flex-col gap-4 w-fit border-transparent">
							<span className="text-white my-3 p-3 border-transparent rounded-lg rounded-tl-none bg-blue-500">
								{data.message}
							</span>
						</div>
					)}
                    else{
                        return(
                            <div key={index} className="flex flex-col gap-4 w-fit border-transparent">
							<span className="text-black my-3 p-3 border-transparent rounded-lg rounded-tl-none bg-white">
								{data.message}
							</span>
						</div>
                        )
                    }
                    })}
				</div>
				<div className="flex flex-row">
					<input
						ref={inputRef}
						type="text"
						className="w-full p-3 rounded-md m-4"
					/>
					<button
						className="m-4 p-3  bg-purple-800 text-white border-transparent rounded-md"
						onClick={() => {
							const message = inputRef.current?.value?.trim();
							wsRef.current.send(
								JSON.stringify({
									type: "chat",
									payload: {
										message: message,
                                        userName:userName
									},
								})
							);
							inputRef.current.value = "";
						}}
					>
						Send
					</button>
				</div>
			</div>
		</>
	);
}

export default Room;

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

function Home() {
	const [isLogged, setIsLogged] = useState(false);
	const [joinRoomDis, setJoinRoomDis] = useState(false);
	const [createRoomDis, setCreateRoomDis] = useState(false);
	const [roomId, setRoomId] = useState("");
	const [username, setUserName] = useState("");
    const navigate=useNavigate();

	const toggleLog = () => {
        if(!isLogged){
            const name:string|null = prompt("What is your name?");
            //@ts-ignore
            setUserName(name);
        }
        else{
            setUserName("");
        }
		setIsLogged((isLogged) => !isLogged);
	};

	const joinRoom = (roomId:string) => {
		if (roomId==="" || !isLogged) {
			alert("Please enter a room ID to join! or please login ");
			return;
		}
		console.log(`Joining room: ${roomId}`);
        navigate(`/room/${roomId}/${username}`)
	};

	const createRoom = () => {};

	return (
		<>
			<nav className="flex justify-end m-3 bg-slate-700 p-5 border-transparent rounded-md ">
				{/* <button className="flex justify-center items-center" > 
            Login
        </button> */}
				{!isLogged ? (
					<Button
						variant="positive"
						text="Login"
						sizes="md"
						onClick={toggleLog}
					></Button>
				) : (
					<Button
						variant="negative"
						text="Logout"
						sizes="md"
						onClick={toggleLog}
					></Button>
				)}
			</nav>
			<div className="main flex flex-col h-[90vh] justify-around items-center ">
				<div className="flex w-9/12 justify-around items-center ">
					<div className="flex flex-col justify-center items-center gap-4">
						<Button
							variant="primary"
							text="Join Room"
							sizes="lg"
							onClick={() => {
                                setRoomId("")                               
								setJoinRoomDis((prev) => !prev);
                                setCreateRoomDis(false);
							}}
						></Button>
						{joinRoomDis && (
							<div className="flex flex-col items-center gap-2">
								<input
									type="text"
									placeholder="Enter Room ID"
									className="p-2 border rounded-md"
									value={roomId}
									onChange={(e) => setRoomId(e.target.value)}
								/>
								<Button
									variant="positive"
									text="Confirm Join"
									sizes="md"
									onClick={()=>{joinRoom(roomId)}}
								/>
							</div>
						)}
					</div>
					<div className="flex flex-col justify-center items-center gap-4">
						<Button
							variant="secondary"
							text="Create Room"
							sizes="lg"
                            onClick={() => {
                                setRoomId("")
								setCreateRoomDis((prev) => !prev);
                                setJoinRoomDis(false);
							}}
						></Button>
						{createRoomDis && (
							<div className="flex flex-col items-center gap-2">
								<input
									type="text"
									placeholder="Enter Room ID"
									className="p-2 border rounded-md"
									value={roomId}
									onChange={(e) => setRoomId(e.target.value)}
								/>
								<Button
									variant="positive"
									text="Confirm Create"
									sizes="md"
									onClick={createRoom}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;

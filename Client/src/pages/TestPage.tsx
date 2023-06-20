import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import Message from "../components/Message";
import RadioButton from "../components/RadioButton";
import TestSection from "../components/TestSection";

export default function TestPage() {
	return (
		<div className="min-h-screen w-screen flex flex-col gap-5 justify-center items-center">
			<TestSection>
				<Button text="Button" accent="orange" />
				<Button text="Button" accent="green" noBorder secondary />
				<Button secondary text="Button" accent="red" />
				<Button text="Button" accent="red" disabled />
				<Button secondary text="Button" accent="cyan" disabled />
				<Button secondary accent="cyan" disabled className="p-1.5">
					<Loading size="small" />
				</Button>
			</TestSection>

			<TestSection>
				<Loading size="small" />
				<Loading size="medium" />
				<Loading size="big" />
			</TestSection>

			<TestSection dir="flex-col">
				<InputField accent="blue" disabled label="Disabled" onChange={console.log} />
				<InputField accent="green" rtl label="نام کاربری" hint="حداقل 8 کاراکتر" />
				<InputField accent="red" label="Sample" />
			</TestSection>

			<TestSection dir="flex-col">
				<CheckBox label="First Item" />
				<CheckBox label="Second Item" checked />
				<CheckBox label="Third Item" />
			</TestSection>

			<TestSection dir="flex-col">
				<RadioButton checked label="First Item" group="g1" />
				<RadioButton label="Second Item" group="g1" />
				<RadioButton label="Third Item" group="g1" />
			</TestSection>

			<TestSection dir="flex-col">
				<Message
					message={{
						id: "1",
						sendDate: "2023-06-08T15:30:00.000Z",
						body: "سلام چطوری؟",
						sender: {
							username: "Mehdi Okh",
							lastSeen: "2023-06-08T15:30:00.000Z",
							avatarUrl: ""
						}
					}}
					fromUser={false}
					selectMessage={console.log}
					chatId={""}
					chatType="Group"
				/>
				<Message
					message={{
						id: "2",
						sendDate: "2023-06-08T15:31:00.000Z",
						body: "مرسی چطوری؟",
						sender: {
							username: "MMHLEGO",
							lastSeen: "2023-06-08T15:30:00.000Z",
							avatarUrl: ""
						}
					}}
					fromUser={true}
					selectMessage={console.log}
					chatId={""}
					chatType="Group"
				/>
			</TestSection>
		</div>
	);
}

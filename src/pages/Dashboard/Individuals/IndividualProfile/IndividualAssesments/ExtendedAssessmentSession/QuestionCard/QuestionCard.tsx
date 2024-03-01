import RadioButtonField from "src/components/FormComponents/RadioButtonField";
import styles from "./questioncard.module.css";
import { useEffect, useState } from "react";
import {
	RadioButtonFormFieldType,
	SetRadioButtonFormFieldType,
} from "src/components/FormComponents/RadioButtonField/types";
import TextField from "src/components/FormComponents/TextField";
import {
	formFieldType,
	setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";

export interface QuestionCardProps {
	question: string;
	position: number;
	answer: string;
	comment: string;
	optionSelectAction: (option: "YES" | "NO" | string) => void;
	commentAction: (comment: string) => void;
	questionCategory: string;
}

export default function QuestionCard({
	question,
	answer,
	comment,
	position,
	optionSelectAction,
	commentAction,
	questionCategory,
  
}: QuestionCardProps) {
	const [answerOptions, setAnswerOptions] = useState<RadioButtonFormFieldType>({
		options: [
			{
				label: "YES",
				value: "YES",
			},
			{
				label: "NO",
				value: "NO",
			},
		],
		selected: false,
		selectedIndex: 0,
		error: "",
		label: "",
		value: "",
	});

	const [commentModel, setCommentModel] = useState<formFieldType>({
		label: "",
		placeholder: "Enter comments here....",
		value: "",
		error: "",
		validated: false,
	});

	function selectAnswer(
		optionIndex: number,
		model: RadioButtonFormFieldType,
		setModel: SetRadioButtonFormFieldType
	) {
		model.selectedIndex = optionIndex;
		model.value = model.options[optionIndex].value;
		model.selected = true;

		setModel({ ...model });

		optionSelectAction(model.value);
	}

	function setInput(
		value: string,
		model: formFieldType,
		setModel: setFormFieldType
	) {
		model.value = value;
		setModel({ ...model });

		commentAction(model.value);
	}

	useEffect(() => {
		setAnswerOptions((state:any) => ({
			...state,
			selectedIndex: answerOptions.options.findIndex(
				(option) => option.value === answer
			),
			selected: answer ? true : false,
			value: answer,
		}));

		setCommentModel((state:any) => ({
			...state,
			value: comment,
			validated: answer ? true : false,
		}));
	}, [answer, answerOptions.options, comment]);

	return (
		<div className={styles.question_card}>
			<div className={styles.question_wrapper}>
				<div className={styles.question_number}>Q{position}</div>
				<div className={styles.question}>{question}</div>
			</div>
			<div className={styles.question_content}>
				<div className={styles.radio}>
					<RadioButtonField
						label={answerOptions.label}
						options={answerOptions.options}
						selected={answerOptions.selected}
						selectedIndex={answerOptions.selectedIndex}
						selectOption={(optionIndex: number) =>
							selectAnswer(optionIndex, answerOptions, setAnswerOptions)
						}
					/>
					<span className={styles.question_category}>Outcome</span>
				</div>
				<div className={styles.comment}>
					<TextField
						width="97%"
						height="74%"
						placeholder={commentModel.placeholder}
						value={commentModel.value}
						onInput={(value: string) =>
							setInput(value, commentModel, setCommentModel)
						}
					/>
				</div>
			</div>

			<div className={styles.question_content}>
				<div className={styles.question_number}>Q{position}</div>
				<div className={styles.question_content}>
					<div className={styles.question}>
						{question}{" "}
						<span className={styles.question_category}>{questionCategory}</span>
					</div>
			
					<div className={styles.radio}>
						<RadioButtonField
							label={answerOptions.label}
							options={answerOptions.options}
							selected={answerOptions.selected}
							selectedIndex={answerOptions.selectedIndex}
							selectOption={(optionIndex: number) =>
								selectAnswer(optionIndex, answerOptions, setAnswerOptions)
							}
						/>
					</div>
					<div className={styles.comment}>
						<TextField
							width="94%"
							height="74%"
							placeholder={commentModel.placeholder}
							value={commentModel.value}
							onInput={(value: string) =>
								setInput(value, commentModel, setCommentModel)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

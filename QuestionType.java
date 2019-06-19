package org.foryou.moodleconduct.dao.enumclass;

import lombok.Getter;

public enum QuestionType {
	DECLARATIVE(0), //descriptive answer
	TWO_CHOICE(1), //yes or no
	MULTIPLE_CHOICE(2); //choosing the best answer
	
	@Getter
	private Integer type;

	QuestionType(Integer type) {
		this.type = type;
	}
}

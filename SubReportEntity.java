package entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubReportEntity {
	
	private String question;
	private String answer;
	private String correctAnswer;

}

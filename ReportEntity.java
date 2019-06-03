package entity;


import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportEntity {

	private int no_of_wrong;
	private int no_of_right;
	private String status;
	private String status1;
    private String testername; 
    private String testname;
    private String category;
    private Date test_date; 
    private int questionsTaken;
    private int rightanswer;
    private int wronganswer;
    private int unanswer;
    private int severity;
    private int percent; 


}

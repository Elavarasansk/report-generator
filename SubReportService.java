package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import entity.SubReportEntity;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class SubReportService {

	public static void main(String[] args) {



			String sourceFile  = "/Users/mac/eclipse-workspace/report/src/main/java/design/sub_report.jrxml";
			String outputFile = "/Users/mac/eclipse-workspace/report/src/main/java/design/subreport.pdf";
			try {
				JasperReport jasperReport = JasperCompileManager.compileReport(sourceFile);
				List<SubReportEntity> modelList = new ArrayList<SubReportEntity>();

				modelList.add(new SubReportEntity("A for","apple","mongo"));
		//		modelList.add(new SubReportEntity("B for ","Ball","C"));


				JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(modelList);
				Map<String,Object> params = new HashMap<String,Object>();
				JasperPrint jasperPrint =  JasperFillManager.fillReport(jasperReport,params,dataSource);
				JasperExportManager.exportReportToPdfFile(jasperPrint,outputFile);

			}catch(Exception e) {
				System.out.println("Exception"+e.getMessage());
			}
		}

		
}

package service;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.Plot;
import org.jfree.data.general.PieDataset;

import entity.ReportEntity;
import entity.SubReportEntity;
import net.sf.jasperreports.engine.JRAbstractChartCustomizer;
import net.sf.jasperreports.engine.JRChart;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;

public class ReportGeneratorService extends JRAbstractChartCustomizer {

	public static void main(String args[]) {

		String sourceFile  = "/Users/mac/eclipse-workspace/report/src/main/java/design/report.jrxml";
		String outputFile = "/Users/mac/eclipse-workspace/report/src/main/java/design/destination.pdf";
		String sourcSubFile  = "/Users/mac/eclipse-workspace/report/src/main/java/design/sub_report.jrxml";

		try {
			JasperReport jasperReport = JasperCompileManager.compileReport(sourceFile);
			JasperReport jasperSubReport = JasperCompileManager.compileReport(sourcSubFile);

			List<SubReportEntity> modelSubList = new ArrayList<SubReportEntity>();

			modelSubList.add(new SubReportEntity("A for","apple","mongo"));
			modelSubList.add(new SubReportEntity("B for ","Ball","C"));
			

			List<ReportEntity> modelList = new ArrayList<ReportEntity>();
			modelList.add(new ReportEntity(7,7,"Right Answer","Wrong Answer","Elasu","Apti","A",null,0,8,6,0,0,0));


			JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(modelList);
			JRBeanCollectionDataSource dataSubSource = new JRBeanCollectionDataSource(modelSubList);

			Map<String,Object> params = new HashMap<String,Object>();
			JasperPrint jasperPrint =  JasperFillManager.fillReport(jasperReport,params,dataSource);
			JasperPrint jasperSubPrint =  JasperFillManager.fillReport(jasperSubReport,params,dataSubSource);

			JasperExportManager.exportReportToPdfFile(jasperPrint,outputFile);
			OutputStream output = new FileOutputStream(new File(outputFile));
			JRPdfExporter exporter = new JRPdfExporter();
			exporter.setExporterInput(SimpleExporterInput.getInstance(Arrays.asList(jasperPrint,jasperSubPrint))); //Set as export input
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(output)); //Set output stream
			SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
			//set your configuration
			exporter.setConfiguration(configuration);
			exporter.exportReport();
			output.close();
		}catch(Exception e) {
			System.out.println("Exception"+e.getMessage());
		}
	}

	@Override
	public void customize(JFreeChart chart, JRChart jasperChart) {
		// Check the type of plot
		Plot plot = chart.getPlot();
		if (plot instanceof PiePlot) {
			PiePlot piePlot = (PiePlot) plot;   
			Map<String, Color> colorMap = new HashMap<>();
			colorMap.put("pass",Color.GREEN);
			colorMap.put("fail", Color.RED);     
			PieDataset dataset = piePlot.getDataset();   
			//Assign color to each section of pie chart based on value of key
			for (int i = 0; i < dataset.getItemCount(); i++) {
				setSectionColor(piePlot, dataset.getKey(i), "Right Answer",colorMap);
				setSectionColor(piePlot, dataset.getKey(i), "Wrong Answer",colorMap);
			}

		}

	}
	private void setSectionColor(PiePlot piePlot, Comparable key, String parterName, Map<String, Color> colorMap) {			
		if(key.toString().toLowerCase().contains(parterName)) {
			piePlot.setSectionPaint(key, colorMap.get(parterName));
		}  					
	}

}

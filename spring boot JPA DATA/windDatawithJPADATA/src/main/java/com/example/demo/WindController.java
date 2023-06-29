package com.example.demo;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class WindController {

	@Autowired
	windRepository windRepo;
	
	@GetMapping("/windData")
	public List<wind> getAllWinds(){
		return windRepo.findAll();
	}
	
	
	@GetMapping("/windData/byid/{id}")
	public ResponseEntity<wind> getwindById(@PathVariable("id") Integer id){
		Optional<wind> windData = windRepo.findById(id);
		
		if(windData.isPresent()) {
			return new ResponseEntity<>(windData.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	@GetMapping("/windData/getDate/{wdate}")
//	public ResponseEntity<List<wind>> getwindById(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate wdate){
//
//		try {
//			List<wind> windList = windRepo.findByWdate(wdate);
//		
//			
//			if(windList.isEmpty()) {
//				System.out.println("isEmpty see here :"+ windList);
//				return new ResponseEntity<>(windList, HttpStatus.NO_CONTENT);
//			}
//			
//			return new ResponseEntity<>(windRepo.findByWdate(wdate), HttpStatus.OK);
//			
//		}catch(Exception e) {
//				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//			}
//	
//	}
	
	@GetMapping("/windData/{refTime}")
	public ResponseEntity<List<wind>> getwindByDateTime(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime refTime){

		try {
			List<wind> windList = windRepo.findByWdateTime(refTime);
			if(windList.isEmpty()) {
				System.out.println("isEmpty see here :"+ windList);
				return new ResponseEntity<>(windList, HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(windRepo.findByWdateTime(refTime), HttpStatus.OK);
			
		}catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	
	}
	
	@PostMapping("/windData")
	public List<wind> createWind(@RequestBody List<wind> windId) {
		
		return windRepo.saveAll(windId);
	}
	

//	@PutMapping("/tutorials/{id}")
//	public ResponseEntity<Tutorial> updateTutorial(@PathVariable("id") long id, @RequestBody Tutorial tutorial) {
//		Optional<Tutorial> tutorialData = tutorialRepository.findById(id);
//
//		if (tutorialData.isPresent()) {
//			Tutorial _tutorial = tutorialData.get();
//			_tutorial.setTitle(tutorial.getTitle());
//			_tutorial.setDescription(tutorial.getDescription());
//			_tutorial.setPublished(tutorial.isPublished());
//			return new ResponseEntity<>(windRepo.save(_tutorial), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}

	@DeleteMapping("/windData/byid/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer id) {
		try {
			windRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/windData/{refTime}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("refTime") LocalDateTime refTime) {
		try {
			windRepo.deleteByWdateTime(refTime);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/windData")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			windRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
}

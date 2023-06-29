package com.example.demo;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface windRepository extends JpaRepository<wind, Integer>{

	
	@Query( value = "SELECT * FROM newgiszone WHERE ? BETWEEN reftime AND date ", nativeQuery = true)
	List<wind> findByWdateTime(LocalDateTime refTime);
	
	@Query( value = "DELETE * FROM newgiszone WHERE ? BETWEEN reftime AND date ", nativeQuery = true)
	List<wind> deleteByWdateTime(LocalDateTime refTime);
}



package com.example.demo;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRawValue;


@Entity
@Table(name="newgiszone")

public class wind {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Embedded
	private Header header;
	
	@Embedded
	private Meta meta;

	@JsonProperty("data")
	private Float[] data;

	public wind() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public Meta getMeta() {
		return meta;
	}

	public void setMeta(Meta meta) {
		this.meta = meta;
	}

	public Float[] getData() {
		return data;
	}

	public void setData(Float[] data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "wind [id=" + id + ", header=" + header + ", meta=" + meta + ", data=" + Arrays.toString(data) + "]";
	}
	
}

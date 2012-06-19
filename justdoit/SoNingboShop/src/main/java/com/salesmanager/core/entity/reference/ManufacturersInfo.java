/*
 * Licensed to csti consulting 
 * You may obtain a copy of the License at
 *
 * http://www.csticonsulting.com
 * Copyright (c) 2006-Aug 24, 2010 Consultation CS-TI inc. 
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.salesmanager.core.entity.reference;

// Generated Nov 11, 2009 9:19:10 AM by Hibernate Tools 3.2.4.GA

import java.util.Date;

/**
 * ManufacturersInfo generated by hbm2java
 */
public class ManufacturersInfo implements java.io.Serializable {

	private ManufacturersInfoId id;
	private String manufacturersUrl;
	private int urlClicked;
	private Date dateLastClick;

	public ManufacturersInfo() {
	}

	public ManufacturersInfo(ManufacturersInfoId id, String manufacturersUrl,
			int urlClicked) {
		this.id = id;
		this.manufacturersUrl = manufacturersUrl;
		this.urlClicked = urlClicked;
	}

	public ManufacturersInfo(ManufacturersInfoId id, String manufacturersUrl,
			int urlClicked, Date dateLastClick) {
		this.id = id;
		this.manufacturersUrl = manufacturersUrl;
		this.urlClicked = urlClicked;
		this.dateLastClick = dateLastClick;
	}

	public ManufacturersInfoId getId() {
		return this.id;
	}

	public void setId(ManufacturersInfoId id) {
		this.id = id;
	}

	public String getManufacturersUrl() {
		return this.manufacturersUrl;
	}

	public void setManufacturersUrl(String manufacturersUrl) {
		this.manufacturersUrl = manufacturersUrl;
	}

	public int getUrlClicked() {
		return this.urlClicked;
	}

	public void setUrlClicked(int urlClicked) {
		this.urlClicked = urlClicked;
	}

	public Date getDateLastClick() {
		return this.dateLastClick;
	}

	public void setDateLastClick(Date dateLastClick) {
		this.dateLastClick = dateLastClick;
	}

}
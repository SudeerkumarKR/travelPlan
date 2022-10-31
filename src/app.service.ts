import { Injectable } from '@nestjs/common';
import { APP_VERSION, APP_DOCUMENTATION } from './constants';
import data from './city.json';
import { last } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  sorted_names = []

  constructor() {

// Sorting names in an alphabetical order using quick sort

    this.sorted_names = this.sortNames(this.getCityNames())
  }

  getCitys(target_name) {
    Logger.debug(`target_name`, target_name)
    // Get a list of matching string using bineary sort 
    return this.searchNameFromList(this.sorted_names, target_name)
  }


  async getShortestDistance(city: string) {
    Logger.debug(`getShortestDistance ${city}`)
    let userCity = [];
    let next = [];
    let prev = [];
    let continent = await this.getContentByCity(city)
    let location = await this.getLatLogByCity(city)

// based on the city user selected.
//  get the continent of a list like if user selected city is in africa get the shortest distance of europe by condition were it is the shortest distance of asia like wise 
// austria


    if (continent == 'africa') {
      let nextNearestCity = this.getNearestCityFromContinent(location, city, 'asia')
      console.log("nextNearestCity", nextNearestCity)
      return nextNearestCity
    }

  }

  getContentByCity(city) {
    for (let i in data) { if (data[i].name == city) return data[i].contId }

    return []
  }

  getLatLogByCity(city) {
    for (let i in data) { if (data[i].name == city) return data[i].location }

    return []
  }

  getNearestCityFromContinent(location, city, continent) {
    let neartCity = [];
    let neartLocations = [];
    for (let i in data) {
      if (data[i].contId == continent) {
        neartCity.push({ [data[i].name]: this.getDistanceFromLatLonInKm(location.lat, location.lon, data[i].location.lat, data[i].location.lon) })
      }
    }
    let values = []
    let keys = neartCity.map(doc => values.push(Object.values(doc)))
    const lowst_distance = Math.min(...values)
    let index = neartLocations.indexOf(lowst_distance)
    return neartCity[index]
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; 
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  sortNames(data1) {
    if (data1.length <= 1) { return data1 }
    let less_than_pivot = [];
    let greater_than_pivot = [];
    let pivot = data1[0];
    for (let i = 1; i <= data1.length - 1; i++) {
      if (data1[i] <= pivot) {
        less_than_pivot.push(data1[i])
      } else {
        greater_than_pivot.push(data1[i])
      }
    }
    return [...this.sortNames(less_than_pivot), pivot, ...this.sortNames(greater_than_pivot)]
  }

  getCityNames() {
    let city_list = []
    for (let i in data) { city_list.push(data[i].name) }
    return city_list
  }

  searchNameFromList(sorted_names, target_name) {

    let first = 0;
    let last = sorted_names.length - 1;
    while (first <= last) {
      let midpoint = Number(Math.floor((first + last) / 2).toFixed(0))
      let data_mid = sorted_names
      if (sorted_names[midpoint] == target_name) {
        return sorted_names[midpoint]

      } else if (sorted_names[midpoint] < target_name) {
        if (data_mid.slice(midpoint, last).length < 10) {
          return sorted_names.slice(midpoint, last)
        }
        first = midpoint + 1
      } else {
        let data_mid = sorted_names
        if (data_mid.slice(first, midpoint).length < 10) {
          return sorted_names.slice(first, midpoint)
        }
        last = midpoint - 1
      }
    }
    return null
  }

}

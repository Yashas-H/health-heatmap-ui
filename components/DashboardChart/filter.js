import { DemographicSeroData } from "./data"
import _ from "underscore";
import { Bar } from "react-chartjs-2";
import { colorArray } from "./color";

export const filterTheList = (data, filterby) => {
    let list = []
    for (let i = 0; i < data.length; i++) {
        list.push(data[i][filterby])
    }
    var fList = new Set(list);
    return Array.from(fList);
}
export const CategoryValueData = (data) => {
    const keys = Object.keys(data[0])
    let category = []
    let value = []
    for (let i = 0; i < keys.length; i++) {
        if (typeof data[0][keys[i]] == "string") {
            category.push(keys[i])
        }
        else {
            value.push(keys[i])
        }
    }
    return [category, value]
}
const filterData = (data, filter, selectedFilterList) => {
    if (selectedFilterList.length === 0) { return data }
    return data.filter(word => selectedFilterList.includes(word[filter]));
}
export const filterDSD = (data, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel) => {
    data = filterData(data, filter, selectedFilterList)
    let axisLabel = Object.keys(_.groupBy(data, selectedAxisLabel))
    let grouped = _.groupBy(data, categoryName)
    let groupKey = Object.keys(grouped)
    let subgroupKeyList = []
    for (let i = 0; i < groupKey.length; i++) {
        let subgroup = _.groupBy(grouped[groupKey[i]], selectedAxisLabel)
        subgroupKeyList.push(Object.keys(subgroup))
    }
    let finalData = {}

    for (let i = 0; i < groupKey.length; i++) {
        let midData = {
            'labels': [],
            'filter': [],
            'value': [],
        }
        let subgroup = _.groupBy(grouped[groupKey[i]], selectedAxisLabel)
        let label = []
        let filterList = []
        let value = []
        for (let j = 0; j < grouped[groupKey[i]].length; j++) {
            label.push(grouped[groupKey[i]][j][selectedAxisLabel])
            filterList.push(grouped[groupKey[i]][j][filter])
            value.push(grouped[groupKey[i]][j][indicator])
        }
        midData['labels'] = label
        midData['filter'] = filterList
        midData['value'] = value
        finalData[groupKey[i]] = midData
        subgroupKeyList.push(Object.keys(subgroup))
    }
    return finalData
}



export const filterPlainGraph = (data, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel) => {
    data = filterData(data, filter, selectedFilterList)
    let grouped = _.groupBy(data, categoryName)
    let groupKey = Object.keys(grouped)
    let dataset = []
    let legends = []
    let count = 0
    for (let i = 0; i < groupKey.length; i++) {
        let groupData = []
        for (let k = 0; k < count; k++) {
            groupData.push('')
        }
        for (let j = 0; j < grouped[groupKey[i]].length; j++) {
            legends.push(grouped[groupKey[i]][j][selectedAxisLabel])
            groupData.push(grouped[groupKey[i]][j][indicator])
            count += 1
        }
        let legend = groupKey[i]
        dataset.push({ 'data': groupData, 'label': legend,'backgroundColor':colorArray[i] })
    }
    return [dataset, legends]

}

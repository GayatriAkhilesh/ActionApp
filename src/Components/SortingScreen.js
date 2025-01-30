import React, { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash"
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Modal, SafeAreaView, Alert } from "react-native";
import { applications } from "./TabData.js";

const SortingScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(applications);
    const [sorted, setSorted] = useState(applications); // name and date state
    const [sortType, setSortType] = useState(applications); // type data state
    const [modalState, setModalState] = useState(applications);
    const flatItemRef = useRef();

    const headerTxt = [

        {
            id: 1,
            name: 'Top Apps',
            type: 'application',
        },
        {
            id: 2,
            name: 'Top Games',
            type: 'Games',
        },
        {
            id: 3,
            name: 'Top Books',
            type: 'Books',
        },
        {
            id: 4,
            name: 'Children',
            type: 'Children',
        },
        {
            id: 5,
            name: 'Education',
            type: 'education',
        },
        {
            id: 6,
            name: 'Entertainment',
            type: 'entertainment',
        },
        {
            id: 7,
            name: 'Fitness',
            type: 'fitness',
        },
        {
            id: 8,
            name: 'Photography',
            type: 'photography',
        },

    ];

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const result = applications.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())
            );
            setSearchResult(result);
        } else {
            setSearchResult(applications);
        }
    }

    const handleAscending = () => {
        const ascendingResult = searchResult.sort((a, b) => a.name.localeCompare(b.name))
        setSearchResult(ascendingResult);
        console.log("searchResult", searchResult)
    }


    const handleDescending = () => {
        const descending = searchResult.sort((a, b) => a.name.localeCompare(b.name))
        const descendingResult = descending.reverse();
        setSearchResult(descendingResult);
        console.log("descenting sort", searchResult)
    }

    const handleOldest = () => {
        const oldest = searchResult.sort((a, b) => new Date(a.date) - new Date(b.date))
        setSearchResult(oldest);
        console.log("toOldest sort", searchResult)
    }

    const handleNewest = () => {
        const newest = searchResult.sort((a, b) => new Date(b.date) - new Date(a.date))
        setSearchResult(newest);
        console.log("toNewset sort", searchResult)
    }

    const handleType = (item, index) => {
        const typeResults = applications.filter((ite) => ite.type == item.type)
        setSearchResult(typeResults)
       const selected = item;
        if (sortType.type === item.type){
            setSortType({})
        }else{
            setSortType(selected)
        }
       //setSearchResult(selected);
        setModalState(selected);
    }
    
    const handleCancel = () => {
        setSearchResult([])
        setModalVisible(!modalVisible);
    }

    const handleSortClick = () => {
       // searchResult ? searchResult : applications
    }


    const handleSort = (type) => { //function defining of line 170
       
        switch (type) {
            case "name:asc":
                setSearchResult(handleAscending())
                break;
            case "name:des":
                setSearchResult(handleDescending())
                break;
            case "date:asc":
                setSearchResult(handleOldest())
                break;
            case "date:des":
                setSearchResult(handleNewest())
                break;
        }
        if(sorted === type){
            setSorted([])
        } else{
            setSorted(type)
        }
        setModalState(type)
    }
    console.log('searchResult >>>>>>>>>', searchResult)


    return (

        <SafeAreaView style={{ flex: 1, }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', }}>
                    <View style={{
                        margin: 20, backgroundColor: '#fff', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: {
                            width: 0, height: 2
                        }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
                    }}>
                        <View style={{ borderBottomWidth: 0.5, width: 300, }}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                {/* <Image style={{ width: 15, height: 15, left: 295, bottom: 10 }}
                                 source={require('../components/images/cross.png')} 
                                 /> */}
                            </TouchableOpacity>

                            <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 20, }}>Sort by </Text>
                        </View>
                        <View style={{ padding: 5, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 8 }}>Name :</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity  onPress={() => handleSort("name:asc")} //function calling
                                    style={{
                                        borderWidth: 0.5, borderColor: '#000', borderRadius: 20, padding: 8, marginHorizontal: 5,
                                        backgroundColor: sorted === "name:asc" ? '#000' : '#fff'
                                    }}>
                                    <Text
                                        style={{ color: sorted === "name:asc" ? '#fff' : '#000' }}
                                    >Ascending Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSort("name:des")} style={{
                                    borderWidth: 0.5, borderColor: '#000', borderRadius: 20, padding: 8, marginHorizontal: 5, backgroundColor: sorted === "name:des" ? '#000' : '#fff'

                                }}>
                                    <Text style={{ color: sorted === "name:des" ? '#fff' : '#000' }}>Descending Order</Text></TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ padding: 5, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Date :</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleSort("date:asc")} style={{ borderWidth: 0.5, borderColor: '#000', borderRadius: 20, padding: 8, marginHorizontal: 5, backgroundColor: sorted === "date:asc" ? '#000' : '#fff' }}>
                                    <Text style={{ color: sorted === "date:asc" ? '#fff' : '#000' }}>Newest to Oldest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSort("date:des")} style={{ borderWidth: 0.5, borderColor: '#000', borderRadius: 20, padding: 8, marginHorizontal: 5, backgroundColor: sorted === "date:des" ? '#000' : '#fff' }}>
                                    <Text style={{ color: sorted === "date:des" ? '#fff' : '#000' }}>Oldest to Newest</Text></TouchableOpacity>

                            </View>

                        </View>
                        <View style={{ height: 160, width: 282, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Type :</Text>
                            <FlatList
                                data={headerTxt}
                                extraData={headerTxt}
                                numColumns={3}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <TouchableOpacity onPress={() => handleType(item, index)} style={{
                                            borderWidth: 0.5, borderColor: '#000', borderRadius: 20, padding: 6, margin: 5,
                                            backgroundColor: sortType.type == item.type ? '#000' : '#fff'
                                        }}
                                        >
                                            <Text
                                                style={{ color:  sortType.type == item.type ? '#fff' : '#000' }}
                                            >{item.type}</Text>
                                        </TouchableOpacity>
                                    </View>

                                )} />
                        </View>

                        <View style={{ flexDirection: 'row', width: 250, alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: sortType == applications && sorted == applications ? "#808080" : '#000', padding: 10, borderRadius: 14, width: 100 }}
                                onPress={() => handleSortClick()}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Sort</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#000', padding: 10, borderRadius: 14, width: 100, }} onPress={handleCancel}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            <View style={{ padding: 10, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ borderWidth: 0.5, width: '83%', height: 40, borderRadius: 20, alignItems: 'center', flexDirection: 'row' }}>
                        {/* <Image style={{ width: 18, height: 18, marginLeft: 8 }} source={require('../components/images/search.png')} /> */}
                        <TextInput style={{ padding: 10, }}
                            onChangeText={(text) => handleSearch(text)}
                            placeholder="Search here ..." />
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        {/* <Image style={{ width: 30, height: 30, marginLeft: 16 }} source={require('../components/images/filter.png')} /> */}
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={searchResult ? searchResult : applications}
                        extraData={searchResult ? searchResult : applications}
                        showsVerticalScrollIndicator={false}
                        ref={flatItemRef}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <View style={{
                                borderBottomWidth: 0.25, width: '100%', height: 90, flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between', padding: 10,
                            }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "space-between", padding: 10, }}>
                                    <Text>{item.id}</Text>
                                    <Image style={{ width: 60, height: 60, resizeMode: 'center', marginHorizontal: 10, }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/831/831378.png' }} />
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', height: 60, padding: 10, width: '66%', }}>
                                    <Text style={{ fontSize: 17, color: '#000', fontWeight: 500, }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: 12, fontWeight: 200, paddingHorizontal: 8 }}>{item.branch}</Text>
                                        <Text style={{ fontSize: 10, fontWeight: 200, }}>{item.type}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    // ListEmptyComponent={() => <Text>Empty</Text>}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SortingScreen;
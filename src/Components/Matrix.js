import React, { useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const Matrix = () => {
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [matrixOne, setMatrixOne] = useState([]);
    const [matrixTwo, setMatrixTwo] = useState([]);
    const [result, setResult] = useState([]);

    const handleCreate = () => {
        setMatrixOne(Array.from({ length: rows }, () => Array(columns).fill(0)));
        setMatrixTwo(Array.from({ length: rows }, () => Array(columns).fill(0)));
        setResult(Array.from({ length: rows }, () => Array(columns).fill(0)));
    };

    const handleNumber = (type, item) => {
        if (type === "row") {
            setRows(parseInt(item));
        } else {
            setColumns(parseInt(item));
        }
    };

    const handleGetNumbersMat1 = (num, rowIndex, colIndex) => {
        setMatrixOne(prev => {
            const newMatrix = prev.map(row => [...row]); 
            newMatrix[rowIndex][colIndex] = parseInt(num);
            return newMatrix;
        });
    };

    const handleGetNumbersMat2 = (num, rowIndex, colIndex) => {
        setMatrixTwo(prev => {
            const newMatrix = prev.map(row => [...row]); 
            newMatrix[rowIndex][colIndex] = parseInt(num);
            return newMatrix;
        });
    };

    const handleAddition = () => {
        const sumMatrix = matrixOne.map((row, index) =>
            row.map((num, j) => num + matrixTwo[index][j])
        );
        setResult(sumMatrix);
    };

    const handleSubtraction = () => {
        const subMatrix = matrixOne.map((row, index) =>
            row.map((num, j) => num - matrixTwo[index][j])
        );
        setResult(subMatrix);
    };

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "400", textAlign: "center" }}>
                    Matrix Screen
                </Text>

                <View style={{ paddingVertical: 20, alignItems: "center" }}>
                    <TextInput
                        style={{
                            borderWidth: 0.5,
                            width: "95%",
                            height: 40,
                            borderRadius: 15,
                            padding: 10,
                            margin: 10,
                        }}
                        placeholder="Enter the number of Rows.."
                        keyboardType="number-pad"
                        onChangeText={(item) => handleNumber("row", item)}
                    />

                    <TextInput
                        style={{
                            borderWidth: 0.5,
                            width: "95%",
                            height: 40,
                            borderRadius: 15,
                            padding: 10,
                            margin: 10,
                        }}
                        placeholder="Enter the number of Columns.."
                        keyboardType="number-pad"
                        onChangeText={(item) => handleNumber("column", item)}
                    />

                    <TouchableOpacity
                        style={{
                            width: 120,
                            height: 35,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#000",
                        }}
                        onPress={handleCreate}
                    >
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Create</Text>
                    </TouchableOpacity>
                </View>

               
                {[matrixOne, matrixTwo].map((matrix, index) => (
                    <View
                        key={index}
                        style={{
                            borderWidth: 0.25,
                            width: "80%",
                            height: 275,
                            alignSelf: "center",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            marginVertical: 20,
                        }}
                    >
                        <Text style={{ alignSelf: "center", marginBottom: 10 }}>
                            {index === 0 ? "Matrix 1" : "Matrix 2"}
                        </Text>
                        {matrix.map((row, rowIndex) => (
                            <View
                                key={rowIndex}
                                style={{ flexDirection: "row", justifyContent: "center" }}
                            >
                                {row.map((_, colIndex) => (
                                    <TextInput
                                        key={`${rowIndex}-${colIndex}`}
                                        keyboardType="numeric"
                                        onSubmitEditing={Keyboard.dismiss}
                                        onChangeText={(num) =>
                                            index === 0
                                                ? handleGetNumbersMat1(num, rowIndex, colIndex)
                                                : handleGetNumbersMat2(num, rowIndex, colIndex)
                                        }
                                        style={{
                                            borderWidth: 0.5,
                                            width: 50,
                                            height: 50,
                                            marginHorizontal: 5,
                                            textAlign: "center",
                                        }}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>
                ))}

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <TouchableOpacity
                        style={{
                            width: 120,
                            height: 35,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#000",
                        }}
                        onPress={handleAddition}
                    >
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Addition</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 120,
                            height: 35,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#000",
                        }}
                        onPress={handleSubtraction}
                    >
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Subtraction</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        borderStyle: "dashed",
                        borderWidth: 1,
                        width: "90%",
                        height: 200,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        marginTop: 20,
                    }}
                >
                    {result.map((row, rowIndex) => (
                        <View
                            key={rowIndex}
                            style={{ flexDirection: "row", justifyContent: "center" }}
                        >
                            {row.map((value, colIndex) => (
                                <View
                                    key={`${rowIndex}-${colIndex}`}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        marginHorizontal: 5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 0.5,
                                    }}
                                >
                                    <Text>{value}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Matrix;

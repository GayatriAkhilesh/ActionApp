import React, { useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const Matrix = () => {
    const [numMatrices, setNumMatrices] = useState(2); // Number of matrices
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [matrices, setMatrices] = useState([]);
    const [result, setResult] = useState([]);

    const handleCreate = () => {
        const newMatrices = Array.from({ length: numMatrices }, () =>
            Array.from({ length: rows }, () => Array(columns).fill(0))
        );
        setMatrices(newMatrices);
        setResult(Array.from({ length: rows }, () => Array(columns).fill(0)));
    };

    const handleNumber = (type, value) => {
        if (type === "matrices") setNumMatrices(parseInt(value) || 2);
        if (type === "row") setRows(parseInt(value) || 0);
        if (type === "column") setColumns(parseInt(value) || 0);
    };

    const handleMatrixInput = (num, rowIndex, colIndex, matrixIndex) => {
        setMatrices(prev => {
            const newMatrices = prev.map(matrix => matrix.map(row => [...row])); // Deep copy
            newMatrices[matrixIndex][rowIndex][colIndex] = parseInt(num) || 0;
            return newMatrices;
        });
    };

    const handleAddition = () => {
        const sumMatrix = matrices.reduce((acc, matrix) =>
            acc.map((row, i) => row.map((num, j) => num + matrix[i][j]))
        );
        setResult(sumMatrix);
    };

    const handleSubtraction = () => {
        const subMatrix = matrices.slice(1).reduce((acc, matrix) =>
            acc.map((row, i) => row.map((num, j) => num - matrix[i][j])),
            matrices[0]
        );
        setResult(subMatrix);
    };

    const handleMultiplication = () => {
        if (matrices.some((_, i) => i > 0 && matrices[i - 1][0].length !== matrices[i].length)) {
            alert("Matrix multiplication requires matching dimensions (Columns of one = Rows of next).");
            return;
        }

        let mulMatrix = matrices[0];
        for (let k = 1; k < matrices.length; k++) {
            const nextMatrix = matrices[k];
            const rowsA = mulMatrix.length;
            const colsA = mulMatrix[0].length;
            const colsB = nextMatrix[0].length;

            let tempMatrix = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

            for (let i = 0; i < rowsA; i++) {
                for (let j = 0; j < colsB; j++) {
                    for (let m = 0; m < colsA; m++) {
                        tempMatrix[i][j] += mulMatrix[i][m] * nextMatrix[m][j];
                    }
                }
            }
            mulMatrix = tempMatrix;
        }

        setResult(mulMatrix);
    };

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "400", textAlign: "center" }}>Matrix Screen</Text>

                {/* Input Fields for Number of Matrices, Rows & Columns */}
                <View style={{ paddingVertical: 20, alignItems: "center" }}>
                    <TextInput
                        style={{ borderWidth: 0.5, width: "95%", height: 40, borderRadius: 15, padding: 10, margin: 10 }}
                        placeholder="Enter Number of Matrices"
                        keyboardType="number-pad"
                        onChangeText={(value) => handleNumber("matrices", value)}
                    />
                    <TextInput
                        style={{ borderWidth: 0.5, width: "95%", height: 40, borderRadius: 15, padding: 10, margin: 10 }}
                        placeholder="Enter Rows"
                        keyboardType="number-pad"
                        onChangeText={(value) => handleNumber("row", value)}
                    />
                    <TextInput
                        style={{ borderWidth: 0.5, width: "95%", height: 40, borderRadius: 15, padding: 10, margin: 10 }}
                        placeholder="Enter Columns"
                        keyboardType="number-pad"
                        onChangeText={(value) => handleNumber("column", value)}
                    />
                    <TouchableOpacity
                        style={{ width: 120, height: 35, borderRadius: 20, borderWidth: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}
                        onPress={handleCreate}
                    >
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Create</Text>
                    </TouchableOpacity>
                </View>

                {/* Matrix Inputs */}
                {matrices.map((matrix, matrixIndex) => (
                    <View key={matrixIndex} style={{ borderWidth: 0.25, width: "80%", height: 275, alignSelf: "center", justifyContent: "space-evenly", alignItems: "center", marginVertical: 20 }}>
                        <Text style={{ alignSelf: "center", marginBottom: 10 }}>Matrix {matrixIndex + 1}</Text>
                        {matrix.map((row, rowIndex) => (
                            <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "center" }}>
                                {row.map((_, colIndex) => (
                                    <TextInput
                                        key={`${rowIndex}-${colIndex}`}
                                        keyboardType="numeric"
                                        onSubmitEditing={Keyboard.dismiss}
                                        onChangeText={(num) =>
                                            handleMatrixInput(num, rowIndex, colIndex, matrixIndex)
                                        }
                                        style={{ borderWidth: 0.5, width: 50, height: 50, marginHorizontal: 5, textAlign: "center" }}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>
                ))}

                {/* Operation Buttons */}
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <TouchableOpacity onPress={handleAddition} style={{ width: 120, height: 35, borderRadius: 20, borderWidth: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Addition</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubtraction} style={{ width: 120, height: 35, borderRadius: 20, borderWidth: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Subtraction</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMultiplication} style={{ width: 120, height: 35, borderRadius: 20, borderWidth: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                        <Text style={{ color: "#fff", fontWeight: "900" }}>Multiplication</Text>
                    </TouchableOpacity>
                </View>

                {/* Result Display */}
                <View style={{ borderStyle: "dashed", borderWidth: 1, width: "90%", height: 200, alignSelf: "center", alignItems: "center", justifyContent: "space-evenly", marginTop: 20 }}>
                    {result.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "center" }}>
                            {row.map((value, colIndex) => (
                                <Text key={`${rowIndex}-${colIndex}`} style={{ margin: 10 }}>{value}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Matrix;

function initQuad(gl) {
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

function renderQuad(gl) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}



while (true) {



    renderQuad();
}


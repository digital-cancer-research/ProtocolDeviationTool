/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package org.digitalecmt.qualityassurance.service;


import java.util.List;

import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.repository.DataUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DataUploadService {
    private final DataUploadRepository dataUploadRepository;

    @Autowired
    public DataUploadService(DataUploadRepository dataUploadRepository) {
        this.dataUploadRepository = dataUploadRepository;
    }

    public List<DataEntry> getAllDataUploads() {
        return dataUploadRepository.findAll();
    }

    public DataEntry getDataUploadById(Integer dataUploadId) {
        return dataUploadRepository.findById(dataUploadId).orElse(null);
    }

    public DataEntry saveDataUpload(DataEntry dataUpload) {
        return dataUploadRepository.save(dataUpload);
    }

    public void deleteDataUpload(Integer dataUploadId) {
        dataUploadRepository.deleteById(dataUploadId);
    }
}

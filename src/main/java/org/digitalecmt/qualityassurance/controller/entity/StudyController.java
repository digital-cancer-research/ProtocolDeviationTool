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

package org.digitalecmt.qualityassurance.controller.entity;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.Study;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/studies")
public class StudyController {
    @Autowired
    private DataEntryRepository dataEntryRepository;

    @GetMapping
    public ResponseEntity<List<DataEntry>> getAllStudies() {
        List<DataEntry> studies = dataEntryRepository.findAll();
        return new ResponseEntity<>(studies, HttpStatus.OK);
    }

    @PutMapping("/update/{studyId}")
    public ResponseEntity<Map<String, String>> updateStudyName(@PathVariable String studyId, @RequestBody Map<String, String> request) {
        String newStudyName = request.get("studyName");

        DataEntry existingStudy = dataEntryRepository.findByStudyId(studyId).orElse(null);

        if (existingStudy != null) {
            existingStudy.setStudyId(newStudyName);
            dataEntryRepository.save(existingStudy);
            return new ResponseEntity<>(Collections.singletonMap("message", "Study name updated successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("message", "Study not found"), HttpStatus.NOT_FOUND);
        }
    }
}
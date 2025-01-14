package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.File.FileCreateDto;
import org.digitalecmt.qualityassurance.models.entities.File;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

/**
 * Mapper interface for converting between FileCreateDto and File entities.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FileMapper {

    /**
     * Converts a FileCreateDto to a File entity.
     *
     * @param file the FileCreateDto to convert
     * @return the converted File entity
     */
    File toFile(FileCreateDto file);
    
}

package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto;
import org.digitalecmt.qualityassurance.models.dto.Data.DataDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DataMapper {
    DataMapper INSTANCE = Mappers.getMapper(DataMapper.class);

    @Mapping(target = "dvcat", ignore = true)
    @Mapping(target = "dvdecod", ignore = true)
    @Mapping(target = "dvterm", ignore = true)
    DataDto toDataDto(BaseDataDto data);
}

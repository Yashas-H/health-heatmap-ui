import React, { useState, useContext, useEffect, useRef } from "react";
import { Eye, EyeOff, Info, X, Layers } from "react-feather";
import _, { isEmpty } from "underscore";
import {
  Box,
  Stack,
  Text,
  Flex,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip
,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader
, List, ListItem, ListIcon } from "@chakra-ui/core";




import formatMapData from "../../helper/formatMapData";
import { LayerContext } from "../../context/Layer";
import { IconFilter } from "../Icons";
import Filters from "../Filters";

const filterTypes = ["gender.id", "settlement.id", "socialgroup.id"];
const filterNames = {
  "gender.id": "Gender",
  "settlement.id": "Settlement",
  "socialgroup.id": "Social Group",
};

function Layer({ layer, layerIndex, dragHandleProps, onDuplicateLayer }) {
  const {
    setSelectedLayers,
    selectedLayers,
    setShowMetadata,
    filtersAvailable,
    getFilterInfoForIndicator,
    loadIndicatorData,
    filtersLoading,
    layerEntity,
    setLayerEntity,
    loadedData,
    setLoadedData,
  } = useContext(LayerContext);

  const [opacity, setOpacity] = useState(100);
  const [layers, setLayers] = useState(false);
  const [isFilters, showFilters] = useState(false);
  const [filtersSelected, setFiltersSelected] = useState(false);
  const [filtersList, setFiltersList] = useState({});
  const [selectedLayer, setSelectedLayer] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const initRef = useRef();

  let delayTimer;

  useEffect(() => {
    if (!layer.indicator) return;
    if (
      !_.isEmpty(layer.indicator.data.state) &&
      !_.isEmpty(layer.indicator.data.district)
    ) {
      setLayers(["district", "state"]);
      setSelectedLayer(
        layerEntity[layer.indicator.id]
          ? layerEntity[layer.indicator.id].toLowerCase()
          : "district"
      );
    }
    getFilterInfoForIndicator(layer.indicator);
  }, []);

  useEffect(() => {
    const l = { ...selectedLayers };
    const lid = layer.isIbp ? layer.id : layer.indicator.id;
    if (!l[lid].styles) return;

    l[lid].styles.colors.paint["fill-opacity"] = opacity / 100;
    setSelectedLayers(l);
  }, [opacity]);

  useEffect(() => {
    if (layer.indicator && filtersAvailable[layer.indicator.id])
      updateFilters();
  }, [filtersAvailable]);

  useEffect(() => {
    const l = { ...selectedLayers };
    const lid = layer.isIbp ? layer.id : layer.indicator.id;
    if (!l[lid].styles) return;

    l[lid].styles.colors.paint["fill-opacity"] = opacity / 100;
    setSelectedLayers(l);
  }, [opacity]);

  useEffect(() => {
    if (!filtersSelected) return;
    const i = layer.indicator;

    const timer = setTimeout(() => {
      let filtersToSend = _.omit(filtersSelected, (f) => f.value);
      filtersToSend = _.mapObject(filtersToSend, (f) => [f]);
      filtersToSend = _.omit(filtersToSend, (value) => {
        return !value.length || value[0] === "";
      });
      filtersToSend = _.isEmpty(filtersToSend) ? {} : filtersToSend;

      loadIndicatorData(
        {
          ...i,
          "indicator.id": i.indicatorName,
          "source.id": i.source,
        },
        filtersToSend
      );
    }, 100);
    return () => clearTimeout(timer);
  }, [filtersSelected]);

  useEffect(() => {
    setFilterLoading(
      _.find(filtersLoading, (f) => f.id === layer.indicator.id)
    );
  }, [filtersLoading]);

  const updateFilters = () => {
    let fa = filtersAvailable[layer.indicator.id];
    fa = _.pick(
      fa,
      (v, key) => _.indexOf(filterTypes, key) >= 0 && v.length > 0
    );
    setFiltersList(
      _.mapObject(fa, function (val, key) {
        return _.without(val, null);
      })
    );
  };

  const removeIndicator = (indicatorId) => {
    const filtredLayers = _.omit(selectedLayers, indicatorId);
    const loadedDataR = _.omit(loadedData, indicatorId);
    setSelectedLayers({ ...filtredLayers });
    setLoadedData({ ...loadedDataR });
  };

  const onSliderChange = (value) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      setOpacity(value);
    }, 500);
  };

  const onLayerChange = (value) => {
    setSelectedLayer(value);
    setLayerEntity({
      ...layerEntity,
      [layer.indicator.id]: value.toUpperCase(),
    });
    const layersData = JSON.parse(JSON.stringify(selectedLayers));
    layersData[layer.indicator.id] = {
      ...layersData[layer.indicator.id],
      ...formatMapData(layer.indicator.data, value.toUpperCase(), opacity),
    };
    setSelectedLayers(JSON.parse(JSON.stringify(layersData)));
  };

  const handleDuplicateLayer = (l) => {
    const sl = { ...selectedLayers };
    const layerOrder = _.keys(selectedLayers);
    sl[`${l.__id}-DUPE`] = {
      ...l,
      id: `${l.__id}-DUPE`,
      __id: `${l.__id}-DUPE`,
      indicator: { ...l.indicator, id: `${l.__id}-DUPE` },
      styles: {
        ...l.styles,
        __id: `${l.__id}-DUPE`,
        colors: {
          ...l.styles.colors,
          id: `${l.__id}-DUPE`,
          source: `${l.__id}-DUPE`,
        },
      },
    };
    layerOrder.splice(_.indexOf(layerOrder, l.id), 0, `${l.__id}-DUPE`);
    const newItems = {};
    _.each(layerOrder, (lo) => (newItems[lo] = sl[lo]));
    setSelectedLayers(JSON.parse(JSON.stringify(newItems)));
  };

  const handleShowMetadata = (e) => {
    const metdataInfo = layer.isIbp
      ? { ...layer }
      : { ...layer.indicator, "indicator.id": layer.indicator.indicatorName };
    setShowMetadata(metdataInfo);
  };

  const onFilterChange = (filterChanged) => {
    setFiltersSelected({
      ...filtersSelected,
      [filterChanged.filterType]: filterChanged.value,
    });
  };

  return (
    <Box className="layer-item" padding="10px">
      <Stack isInline>
        <Stack isInline {...dragHandleProps} width="100%">
          <Icon name="drag-handle" size="16px" color="#7f7e7e" mt="6px" />
          <Box>
            <Text fontWeight="bold" fontSize="13px">
              {layer.indicator
                ? layer.indicator.indicatorName
                : layer.layerName}
            </Text>
            <Text fontWeight="300" fontSize="12px">
              Source: 
              {' '}
              {layer.indicator ? layer.indicator.source : "IBP"}
            </Text>
          </Box>
        </Stack>
        <Stack>
          {/* <Tooltip label="Duplicate Layer">
						<Icon
							name="copy"
							cursor="pointer"
							size="16px"
							color="#707070"
							onClick={(e) => handleDuplicateLayer(layer)}
						/>
					</Tooltip> */}
        </Stack>
      </Stack>

      <Flex align="center">
        <Flex size="70%" align="left" justify="center" mx="14px">
          <Slider defaultValue={opacity} onChange={onSliderChange}>
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb>
              <Tooltip label="Layer Opacity">
                <Box
                  backgroundColor="blue.500"
                  borderWidth="4px"
                  rounded="6px"
                  borderColor="blue.500"
                />
              </Tooltip>
            </SliderThumb>
          </Slider>
        </Flex>
        <Box>
          <Stack isInline spacing={3} shouldWrapChildren color="#717171">
            <Flex align="flex-end">
              <Tooltip label="Show/Hide Layer">
                <Stack isInline>
                  {opacity ? (
                    <Eye
                      size="20px"
                      cursor="pointer"
                      onClick={(e) => setOpacity(0)}
                    />
                  ) : (
                    <EyeOff
                      size="20px"
                      cursor="pointer"
                      onClick={(e) => setOpacity(100)}
                    />
                  )}
                </Stack>
              </Tooltip>
            </Flex>
            {layers ? (
              <Popover initialFocusRef={initRef}>
                {({ isOpen, onClose }) => (
                  <>
                    <PopoverTrigger>
                      {/* <Tooltip label="Switch Layer Data"> */}
                      <Layers size="20px" cursor="pointer" />
                      {/* </Tooltip> */}
                    </PopoverTrigger>
                    <PopoverContent zIndex={4} width="150px">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Select Layer</PopoverHeader>
                      <PopoverBody fontSize="14px">
                        <List spacing={1}>
                          {_.map(layers, (l) => {
                            return (
                              <ListItem
                                key={l}
                                cursor="pointer"
                                onClick={(e) => {
                                  onClose();
                                  onLayerChange(l);
                                }}
                                ref={initRef}
                              >
                                <Stack isInline>
                                  <ListIcon
                                    icon="check-circle"
                                    color={
                                      selectedLayer === l
                                        ? "green.500"
                                        : "#ffffff00"
                                    }
                                  />
                                  <Text textTransform="capitalize">{l}</Text>
                                </Stack>
                              </ListItem>
                            );
                          })}
                        </List>
                      </PopoverBody>
                    </PopoverContent>
                  </>
                )}
              </Popover>
            ) : (
              <Layers size="20px" cursor="not-allowed" color="#dcdcdc" />
            )}
            <Tooltip label="Filters">
              <Box
                cursor={`${_.isEmpty(filtersList) ? "not-allowed" : "pointer"}`}
                opacity={`${_.isEmpty(filtersList) ? "30%" : "100%"}`}
                className={`${isFilters ? "filter-btn-active" : ""}`}
                onClick={(e) => {
                  if (!_.isEmpty(filtersList)) return showFilters(!isFilters);
                }}
              >
                <IconFilter />
              </Box>
            </Tooltip>
            <Tooltip label="Layer Information" zIndex="9">
              <Info
                size="20px"
                cursor="pointer"
                onClick={handleShowMetadata}
              />
            </Tooltip>
            <Tooltip label="Remove Layer" zIndex="9">
              <Icon
                name="delete"
                size="16px"
                color="#7f7e7e"
                mt="6px"
                onClick={(e) =>
                  removeIndicator(
                    layer.indicator ? layer.indicator.id : layer.id
                  )}
                cursor="pointer"
              />
            </Tooltip>
          </Stack>
        </Box>
      </Flex>

      {/* Fiters Area */}
      {isFilters && (
        <Box>
          <Filters
            filtersList={filtersList}
            onFilterChange={onFilterChange}
            filterNames={filterNames}
            filtersSelected={filtersSelected}
            isBusy={filterLoading}
          />
        </Box>
      )}

      <Box>
        {layer.indicator && layer.indicator.legends && (
          <Stack className="legend">
            <Flex isInline spacing={0}>
              {_.map(layer.indicator.legends, (d, index) => {
                return (
                  <Box key={index} width={`${100 / 6}%`}>
                    <Box
                      className="palette"
                      style={{
                        backgroundColor: d.color,
                      }}
                    />
                    <Box textAlign="center">{d.value}</Box>
                  </Box>
                );
              })}
            </Flex>
            <Stack isInline alignItems="center">
              <Stack isInline alignItems="center">
                <Box width="12px" height="12px" background="#000000" />
                <Text fontSize="10px">Data does not exist for geoentity</Text>
              </Stack>
              <Stack isInline alignItems="center">
                <Box width="12px" height="12px" background="#a5a5a5" />
                <Text fontSize="10px">Data Not Available</Text>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default Layer;

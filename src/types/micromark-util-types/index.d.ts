export type * from "micromark-util-types";

declare module "micromark-util-types" {
  export interface ContainerState extends ContainerState {
    indentation: number;
  }

  export interface TokenTypeMap extends TokenTypeMap {
    bangInterpolation: "bangInterpolation";
    dummyEvent: "dummyEvent";
    grid: "grid";
    gridContainer: "gridContainer";
    gridContainerNewline: "gridContainerNewline";
    gridContainerPercentSign: "gridContainerPercentSign";
    gridPrefix: "gridPrefix";
    gridProps: "gridProps";
    interpolation: "interpolation";
    interpolationLink: "interpolationLink";
    interpolationLinkLabel: "interpolationLinkLabel";
    interpolationLinkTarget: "interpolationLinkTarget";
    interpolationTemp: "interpolationTemp";
  }
}

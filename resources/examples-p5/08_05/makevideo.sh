#!/bin/bash

outputName="output.mp4"
dimensions="6480x3840"
fps=30
frameName="png/%07d.png"
crf=17 # CRF should be between 17 and 28. Lower is higher quality
b="24600k" # constent bitrate in Kb/s

ffmpeg -r $fps -f image2 -s $dimensions -i $frameName \
-c:v hevc_videotoolbox -b:v $b -tag:v hvc1 -allow_sw 1 \
-pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
$outputName


# -c:v libx265 -crf $crf -tag:v hvc1 -pix_fmt yuv420p \


# -c:v libx265 -x265-params crf=$crf:psy-rd=1 -tag:v hvc1 \
# -pix_fmt yuv420p  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \



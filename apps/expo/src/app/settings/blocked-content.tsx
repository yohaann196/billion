/**
 * Blocked Content screen — settings sub-page
 *
 * MOCK DATA / TODO:
 * - TODO: Replace MOCK_BLOCKED with real data from tRPC (trpc.user.blocked.list)
 * - TODO: Persist unblock via tRPC mutation (trpc.user.blocked.remove)
 * - TODO: Sources should be blockable from article cards in the feed (not implemented)
 * - TODO: Topics should be blockable from the content-interests screen
 */

import { useCallback, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import { Text, View } from "~/components/Themed";
import { colors, fonts, sp, rd, useTheme } from "~/styles";

interface BlockedItem {
  id: string;
  name: string;
  type: "source" | "topic";
}

// TODO: Replace with tRPC data
const MOCK_BLOCKED: BlockedItem[] = [
  { id: "1", name: "partisan-pundit", type: "source" },
  { id: "2", name: "clickbait-news", type: "source" },
  { id: "3", name: "Cryptocurrency", type: "topic" },
];

const TYPE_ICONS: Record<string, React.ComponentProps<typeof Ionicons>["name"]> = {
  source: "globe-outline",
  topic: "pricetag-outline",
};

function SwipeableBlockedRow({
  item,
  onUnblock,
}: {
  item: BlockedItem;
  onUnblock: (id: string) => void;
}) {
  const { theme } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        style={styles.unblockAction}
        onPress={() => {
          swipeableRef.current?.close();
          onUnblock(item.id);
        }}
        activeOpacity={0.85}
      >
        <Animated.View style={[styles.unblockActionInner, { transform: [{ scale }] }]}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.white} />
          <Text style={styles.unblockActionText}>Unblock</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
      overshootRight={false}
    >
      <View
        style={[styles.row, { borderBottomColor: theme.border, backgroundColor: theme.card }]}
        lightColor={theme.card}
        darkColor={theme.card}
      >
        <View style={styles.rowLeft} lightColor="transparent" darkColor="transparent">
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor:
                  item.type === "source"
                    ? colors.civicBlue + "22"
                    : colors.deepIndigo + "22",
              },
            ]}
            lightColor="transparent"
            darkColor="transparent"
          >
            <Ionicons
              name={TYPE_ICONS[item.type] ?? "ban-outline"}
              size={16}
              color={item.type === "source" ? colors.civicBlue : colors.deepIndigo}
            />
          </View>
          <View style={styles.rowText} lightColor="transparent" darkColor="transparent">
            <Text style={[styles.rowName, { color: theme.foreground }]}>{item.name}</Text>
            <Text style={[styles.rowType, { color: theme.mutedForeground }]}>
              {item.type === "source" ? "Source" : "Topic"}
            </Text>
          </View>
        </View>

        {/* Tap to unblock directly too */}
        <TouchableOpacity
          onPress={() => onUnblock(item.id)}
          style={styles.unblockBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close-circle" size={22} color={theme.mutedForeground} />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

export default function BlockedContentScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  // TODO: Replace with tRPC query data
  const [blocked, setBlocked] = useState<BlockedItem[]>(MOCK_BLOCKED);

  // TODO: Call tRPC mutation to persist
  const handleUnblock = useCallback((id: string) => {
    setBlocked((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <View
        style={[styles.header, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.foreground }]}>Blocked Content</Text>
        <View style={{ width: 44 }} lightColor="transparent" darkColor="transparent" />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {blocked.length === 0 ? (
          <View style={styles.empty} lightColor="transparent" darkColor="transparent">
            <Ionicons name="shield-checkmark-outline" size={48} color={theme.mutedForeground} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Nothing blocked</Text>
            <Text style={[styles.emptyHint, { color: theme.mutedForeground }]}>
              Sources and topics you block will appear here.
            </Text>
          </View>
        ) : (
          <>
            <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
              BLOCKED SOURCES & TOPICS
            </Text>
            <Text style={[styles.swipeHint, { color: theme.mutedForeground }]}>
              Swipe left to unblock
            </Text>
            {blocked.map((item) => (
              <SwipeableBlockedRow key={item.id} item={item} onUnblock={handleUnblock} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sp[4],
    paddingVertical: sp[4],
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
  },
  scroll: { flex: 1 },
  sectionLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 0.8,
    marginTop: sp[6],
    marginBottom: sp[1],
    marginHorizontal: sp[5],
  },
  swipeHint: {
    fontFamily: fonts.body,
    fontSize: 11,
    marginBottom: sp[3],
    marginHorizontal: sp[5],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sp[5],
    paddingVertical: sp[4],
    borderBottomWidth: 1,
  },
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: sp[3],
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: rd.full,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: { flex: 1 },
  rowName: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    marginBottom: 2,
  },
  rowType: {
    fontFamily: fonts.body,
    fontSize: 12,
  },
  unblockBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  unblockAction: {
    backgroundColor: colors.teal,
    justifyContent: "center",
    alignItems: "center",
    width: 88,
  },
  unblockActionInner: {
    alignItems: "center",
    gap: sp[1],
  },
  unblockActionText: {
    color: colors.white,
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: sp[10],
    gap: sp[3],
  },
  emptyText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
  },
  emptyHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
